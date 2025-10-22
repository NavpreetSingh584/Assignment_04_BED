// External library imports
import { Request, Response, NextFunction } from "express";
// Internal module imports
import { ApiError } from "../errors/ApiError";

/**
 * Interface defining the authorization options for the middleware.
 * - `roles`: array of allowed roles that can access a given route
 * - `allowSameUser`: flag that allows users to access their own resource (e.g., via `:uid` param)
 */
export interface AuthorizeOptions {
    roles?: string[];        // allowed roles
    allowSameUser?: boolean; // if true, owner can access via :uid param
}

/**
 * Middleware function to authorize user access based on their role or ownership.
 * 
 * @param opts - Authorization configuration options (roles and allowSameUser flag)
 * @returns Middleware function for Express to control access
 */
export function authorize(opts: AuthorizeOptions) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            // Retrieve authenticated user from request (set in auth middleware)
            const user = (req as any);

            // If user does not exist, they are not authenticated
            if (!user) {
                return next(ApiError.unauthorized("Unauthorized: No user information found"));
            }

            // Extract the user's role and unique ID
            const role = (user as any).role;
            const uid = user.uid;

            // Allow access if allowSameUser is true and the route param matches the user's UID
            // Example: users can access their own data at /users/:uid
            if (opts.allowSameUser && req.params.uid && req.params.uid === uid) {
                return next();
            }

            // If the route has specific role requirements, check if the user meets them
            if (opts.roles && opts.roles.length > 0) {
                // If user has no role or their role isn’t in the allowed list, deny access
                if (!role || !opts.roles.includes(role)) {
                    return next(ApiError.forbidden("Forbidden: Insufficient role privileges"));
                }
            }

            // If all checks pass, grant access
            return next();
        } catch (error: unknown) {
            // Forward any unexpected errors to the global error handler
            next(error);
        }
    };
}
