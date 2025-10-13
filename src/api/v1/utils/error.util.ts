import { BaseError } from "../errors/BaseError";
import { HTTP } from "../../constants/httpConstants";

/**
 * Formats an error into a standardized response structure.
 * Ensures all errors return consistent JSON responses.
 */
export const formatError = (err: unknown) => {
  if (err instanceof BaseError) {
    return {
      status: err.status,
      code: err.code,
      message: err.message,
      details: err.details,
      timestamp: new Date().toISOString(),
    };
  }

  // Fallback for unexpected/unhandled errors
  return {
    status: HTTP.INTERNAL,
    code: "INTERNAL",
    message: "Internal Server Error",
    timestamp: new Date().toISOString(),
  };
};
