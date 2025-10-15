import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebase";
import { ApiError } from "../errors/ApiError";

/**
 * Middleware to authenticate a user using Firebase ID token.
 * 
 * Verifies the provided Bearer token from the Authorization header
 * and attaches the decoded user information (uid, email, and custom claims)
 * to the request object for use in subsequent middleware or routes.
 * 
 * @param req - The Express Request object
 * @param _res - The Express Response object (not used in this middleware)
 * @param next - The Express middleware chaining function
 */
export async function authenticate(
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> {
    try {
        // Extract the 'Authorization' header from the incoming request
        const header = req.headers.authorization;

        // Validate the Authorization header format
        // Expected format: 'Bearer {token}'
        if (!header?.startsWith("Bearer ")) {
            throw ApiError.unauthorized("Missing or invalid Authorization header");
        }

        // Extract the Firebase ID token (the part after 'Bearer ')
        const idToken = header.split(" ")[1];

        // Verify the ID token using Firebase Admin SDK
        // 'verifyIdToken' decodes and validates the token
        const decoded = await auth.verifyIdToken(idToken, true);

        // Attach the decoded user data to the request object
        // This makes user information (uid, email, role, etc.) available to subsequent routes
        req.user = {
            uid: decoded.uid,
            email: decoded.email,
            ...(decoded as any),
        };

        // Continue to the next middleware or route handler
        next();
    } catch (error: unknown) {
        // If token verification fails, send an unauthorized error
        next(ApiError.unauthorized("Invalid or expired token"));
    }
}
