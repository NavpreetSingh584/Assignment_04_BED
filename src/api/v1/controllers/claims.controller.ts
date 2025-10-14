import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebase";
import { HTTP } from "../../constants/httpConstants";
import { ApiError } from "../errors/ApiError";

/**
 * Manages requests, responses, and validation to assign a custom user role.
 * This endpoint allows an admin to set a user's role (e.g., admin, officer, analyst, auditor)
 * using Firebase Authentication's custom claims feature.
 *
 * @param req - The Express Request object
 * @param res - The Express Response object
 * @param next - The Express middleware chaining function
 */
export const setUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract user ID and role from the request body
        const { uid, role } = req.body; // e.g., admin/officer/analyst/auditor

        // Validate required fields
        if (!uid || !role) throw ApiError.badRequest("uid and role are required");

        // Use Firebase Admin SDK to assign the custom claim
        await auth.setCustomUserClaims(uid, { role });

        // Return a success response
        res.status(HTTP.OK).json({
            message: `Role '${role}' has been successfully assigned to user ${uid}`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve user claims (roles).
 * This endpoint allows an admin to view a user’s assigned role
 * from their Firebase Authentication custom claims.
 *
 * @param req - The Express Request object
 * @param res - The Express Response object
 * @param next - The Express middleware chaining function
 */
export const getUserClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract user ID from request parameters
        const { uid } = req.params;

        // Validate UID presence
        if (!uid) throw ApiError.badRequest("uid is required");

        // Retrieve user information and claims from Firebase
        const user = await auth.getUser(uid);

        // Return the user’s claims or an empty object if none exist
        res.status(HTTP.OK).json({
            message: "User claims retrieved successfully",
            uid,
            claims: user.customClaims ?? {},
        });
    } catch (error: unknown) {
        next(error);
    }
};
