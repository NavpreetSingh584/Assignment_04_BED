/**
 * Base error class for the application.
 * Extends the built-in Error class to include:
 * - HTTP status code
 * - Application error code
 * - Optional details for debugging
 */
export class BaseError extends Error {
    public status: number;
    public code: string;
    public details?: unknown;
  
    /**
     * Creates a new BaseError instance.
     * @param message - Error message to display.
     * @param status - HTTP status code.
     * @param code - Application error code.
     * @param details - Optional error details (for logging/debugging).
     */
    constructor(message: string, status: number, code: string, details?: unknown) {
      super(message);
      this.status = status;
      this.code = code;
      this.details = details;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  