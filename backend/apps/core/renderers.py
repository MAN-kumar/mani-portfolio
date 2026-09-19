from rest_framework.renderers import JSONRenderer


class StandardJSONRenderer(JSONRenderer):
    """
    Standard response renderer matching docs/09_API_SPEC.md.
    Wraps single item or non-paginated collection responses in {"data": ...}
    unless already enveloped with 'data'/'error' or returned with HTTP error status.
    """

    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = None
        if renderer_context and "response" in renderer_context:
            status_code = renderer_context["response"].status_code

        # Do not alter error responses or empty/None data
        if status_code and status_code >= 400:
            return super().render(data, accepted_media_type, renderer_context)

        if data is not None and isinstance(data, dict):
            # If already enveloped (e.g., paginated or error envelope), return as is
            if "data" in data or "error" in data:
                return super().render(data, accepted_media_type, renderer_context)
            # Health check or special status endpoints that are explicit dicts can stay or wrap cleanly
            if "status" in data and "service" in data:
                return super().render(data, accepted_media_type, renderer_context)
            formatted_data = {"data": data}
        elif data is not None:
            formatted_data = {"data": data}
        else:
            formatted_data = {"data": None}

        return super().render(formatted_data, accepted_media_type, renderer_context)
