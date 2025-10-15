import express, { Router } from "express";
import * as loanController from "../controllers/loans.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router: Router = express.Router();

/**
 * Routes for managing loan applications.
 * Prefix: "/api/v1/loans"
 *
 * Policy Overview:
 * - Create: officer, admin
 * - List/Get: officer, analyst, admin, auditor
 * - Update: officer, admin
 * - Delete: admin only
 */

// Retrieve all loan applications
router.get(
    "/",
    authenticate,
    authorize({ roles: ["officer", "analyst", "admin", "auditor"] }),
    loanController.getAllLoans
);

// Retrieve a specific loan by ID
router.get(
    "/:id",
    authenticate,
    authorize({ roles: ["officer", "analyst", "admin", "auditor"] }),
    loanController.getLoanById
);

// Create a new loan application
router.post(
    "/",
    authenticate,
    authorize({ roles: ["officer", "admin"] }),
    loanController.createLoan
);

// Update the status of an existing loan
router.put(
    "/:id/status",
    authenticate,
    authorize({ roles: ["officer", "admin"] }),
    loanController.updateLoanStatus
);

// Delete a loan application (Admin only)
router.delete(
    "/:id",
    authenticate,
    authorize({ roles: ["admin"] }),
    loanController.deleteLoan
);

export default router;
