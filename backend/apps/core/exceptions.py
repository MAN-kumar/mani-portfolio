from django.http import Http404
from django.core.exceptions import PermissionDenied as DjangoPermissionDenied
from rest_framework.views import exception_handler
from rest_framework.exceptions import (
    ValidationError,
    NotFound,
    PermissionDenied,
    AuthenticationFailed,
    NotAuthenticated,
)


def custom_exception_handler(exc, context):
    """
    Custom exception handler to return structured error responses matching docs/09_API_SPEC.md:
    {
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid request.",
        "fields": {}
      }
    }
    """
    response = exception_handler(exc, context)

    if response is not None:
        code = "HTTP_ERROR"
        message = "An error occurred."
        fields = {}

        if isinstance(exc, ValidationError):
            code = "VALIDATION_ERROR"
            message = "Validation failed for request parameters."
            if isinstance(response.data, dict):
                fields = response.data
            elif isinstance(response.data, list):
                fields = {"non_field_errors": response.data}
        elif isinstance(exc, (NotFound, Http404)):
            code = "NOT_FOUND"
            message = getattr(exc, "detail", "Resource not found.")
            if message == "Resource not found." and isinstance(response.data, dict) and "detail" in response.data:
                message = str(response.data["detail"])
        elif isinstance(exc, (PermissionDenied, NotAuthenticated, DjangoPermissionDenied)):
            code = "PERMISSION_DENIED"
            message = getattr(exc, "detail", "Permission denied.")
            if message == "Permission denied." and isinstance(response.data, dict) and "detail" in response.data:
                message = str(response.data["detail"])
        elif isinstance(exc, AuthenticationFailed):
            code = "AUTHENTICATION_FAILED"
            message = getattr(exc, "detail", "Authentication failed.")
        else:
            if isinstance(response.data, dict) and "detail" in response.data:
                message = str(response.data["detail"])
            elif isinstance(response.data, str):
                message = response.data

        response.data = {
            "error": {
                "code": code,
                "message": str(message),
                "fields": fields,
            }
        }

    return response
