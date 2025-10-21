import { Router } from "express";
import { setUserRole, getMe, getUser } from "../controllers/auth.controller";
import { verifyToken, checkAdmin } from "../middleware/auth.middleware";

const router = Router();

/**
 * GET /api/v1/auth/me
 */
router.get("/me", verifyToken, getMe);

/**
 * GET /api/v1/auth/users/:uid
 */
router.get("/users/:uid", verifyToken, checkAdmin, getUser);

/**
 * POST /api/v1/auth/set-role
 */
router.post("/set-role", verifyToken, checkAdmin, setUserRole);

export default router;
