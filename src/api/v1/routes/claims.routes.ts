import express, { Router } from "express";
import { setUserRole, getUserClaims } from "../controllers/claims.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router: Router = express.Router();

/**
 * Routes for managing Firebase custom claims (user roles).
 * Prefix: "/api/v1/claims"
 *
 * Access Control:
 * - Only admin users are allowed to set or retrieve user claims.
 */

// Set a custom role for a specific user
router.post(
    "/set-role",
    authenticate,
    authorize({ roles: ["admin"] }),
    setUserRole
);

// Retrieve a user's assigned claims by UID
router.get(
    "/:uid",
    authenticate,
    authorize({ roles: ["admin"] }),
    getUserClaims
);

export default router;
