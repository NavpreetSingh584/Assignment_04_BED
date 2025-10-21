import express from "express";
import { setUserRole } from "../controllers/claims.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router = express.Router();

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
  verifyToken, 
  authorize({ roles: ["admin"] }),
  setUserRole
);

// Retrieve a user's assigned claims by UID
router.get(
  "/:uid",
  verifyToken, 
  authorize({ roles: ["admin"] }),
  setUserRole // (if you later add a getUserRole controller)
);

export default router;
