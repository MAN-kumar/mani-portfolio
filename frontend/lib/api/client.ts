const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export class ApiError extends Error {
  code: string;
  status: number;
  fields?: Record<string, unknown>;

  constructor(message: string, code = "API_ERROR", status = 500, fields?: Record<string, unknown>) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.fields = fields;
  }
}

export interface ApiResponseEnvelope<T> {
  data: T;
  meta?: {
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      // Next.js revalidation strategy: revalidate background data every 60 seconds
      next: { revalidate: 60, ...(options.next || {}) },
    });

    if (!res.ok) {
      let errorCode = "HTTP_ERROR";
      let errorMessage = `HTTP Error ${res.status}: ${res.statusText}`;
      let fields: Record<string, unknown> | undefined;

      try {
        const errorJson = await res.json();
        if (errorJson && errorJson.error) {
          errorCode = errorJson.error.code || errorCode;
          errorMessage = errorJson.error.message || errorMessage;
          fields = errorJson.error.fields;
        }
      } catch {
        // Fallback to text status
      }

      throw new ApiError(errorMessage, errorCode, res.status, fields);
    }

    const json = await res.json();

    // Unwrap DRF standard response envelope { "data": ... }
    if (json && typeof json === "object" && "data" in json) {
      return json.data as T;
    }

    return json as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Failed to connect to backend server",
      "NETWORK_ERROR",
      503
    );
  }
}
