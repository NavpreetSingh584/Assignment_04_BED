import express, { Router } from "express";
import * as loanController from "../controllers/loans.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router: Router = express.Router();

// Retrieve all loan applications
router.get(
  "/",
  verifyToken,
  authorize({ roles: ["officer", "analyst", "admin", "auditor"] }),
  loanController.getAllLoans
);

// Create a new loan
router.post(
  "/",
  verifyToken,
  authorize({ roles: ["officer", "admin"] }),
  loanController.createLoan
);

// Review a loan (analyst, admin)
router.post(
  "/:id/review",
  verifyToken,
  authorize({ roles: ["analyst", "admin"] }),
  loanController.reviewLoan
);

// Approve a loan (officer, admin)
router.put(
  "/:id/approve",
  verifyToken,
  authorize({ roles: ["officer", "admin"] }),
  loanController.approveLoan
);

// Delete a loan (admin only)
router.delete(
  "/:id",
  verifyToken,
  authorize({ roles: ["admin"] }),
  loanController.deleteLoan
);

export default router;
