import { BaseError } from "./BaseError";
import { HTTP} from "../../constants/httpConstants";

/**
 * Factory class for creating standardized API errors.
 * Provides helper methods for common HTTP error types.
 */
export class ApiError {
  static badRequest(message: string, details?: unknown) {
    return new BaseError(message, HTTP.BAD_REQUEST, "BAD_REQUEST", details);
  }

  static unauthorized(message = "Unauthorized") {
    return new BaseError(message, HTTP.UNAUTHORIZED, "UNAUTHORIZED");
  }

  static forbidden(message = "Forbidden") {
    return new BaseError(message, HTTP.FORBIDDEN, "FORBIDDEN");
  }

  static notFound(message = "Not Found") {
    return new BaseError(message, HTTP.NOT_FOUND, "NOT_FOUND");
  }

  static internal(message = "Internal Server Error", details?: unknown) {
    return new BaseError(message, HTTP.INTERNAL, "INTERNAL", details);
  }
}
