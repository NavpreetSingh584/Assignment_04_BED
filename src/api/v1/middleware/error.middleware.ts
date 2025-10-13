import { Request, Response, NextFunction } from "express";
import { formatError } from "../utils/error.util";

/**
 * Global error handling middleware.
 * Must be placed at the end of all middleware in app.ts.
 *
 * Automatically catches and formats errors into
 * a clean, consistent JSON response.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const payload = formatError(err);
  res.status(payload.status).json(payload);
}
