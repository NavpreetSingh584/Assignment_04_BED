import { Router } from "express";
import { setRole } from "../controllers/admin.controller";

const router = Router();

router.post("/claims/set-role", setRole);
export default router;
