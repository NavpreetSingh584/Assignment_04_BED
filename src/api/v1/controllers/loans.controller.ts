import { Request, Response, NextFunction } from "express";
import { HTTP } from "../../constants/httpConstants";
import { Loan } from "../models/loan";

/**
 * Stores all loan applications temporarily in memory.
 * In a real application, this would connect to a database.
 */

let loans: Loan[] = [];

/**
 * Manages requests, responses, and validation to create a Loan.
 * @param req - The express Request object
 * @param res - The express Response object
 * @param next - The express middleware chaining function
 */

export const createLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        // Extract the required loan fields from the request body
        const { applicantName, amount, riskScore } = req.body;

        // Generate timestamps and create a new loan object
        const now = new Date().toISOString();
        const loan: Loan = {
            id: Math.random().toString(36).slice(2),
            applicantName,
            amount: Number(amount),
            riskScore: Number(riskScore),
            status: "PENDING",
            createdAt: now,
            updatedAt: now,
        };

        // Store the new loan in memory
        loans.push(loan);

        // Send success response
        res.status(HTTP.CREATED).json({
            message: "Loan created successfully",
            data: loan,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve all Loans.
 * @param req - The express Request object
 * @param res - The express Response object
 */
export const getAllLoans = (
    req: Request,
    res: Response
): void => {
    // Returns the complete list of loans
    res.status(HTTP.OK).json({
        message: "All loans retrieved successfully",
        data: loans,
    });
};

/**
 * Manages requests and responses to retrieve a Loan by ID.
 * @param req - The express Request object
 * @param res - The express Response object
 */
export const getLoanById = (
    req: Request,
    res: Response
): void => {

    // Search for the loan by its unique ID

    const loan = loans.find((l) => l.id === req.params.id);

    // If not found, send a 404 response
    if (!loan) {
        res.status(HTTP.NOT_FOUND).json({ message: "Loan not found" });
        return;
    }

    // If found, return the loan details
    res.status(HTTP.OK).json({
        message: "Loan retrieved successfully",
        data: loan,
    });
};

/**
 * Manages requests, responses, and validation to update a Loan status.
 * @param req - The express Request object
 * @param res - The express Response object
 */

export const updateLoanStatus = (
    req: Request,
    res: Response
): void => {
    const { id } = req.params;
    const { status } = req.body; // Expected values: 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED'

    // Find the loan record
    const loan = loans.find((l) => l.id === id);

    // If loan not found, return 404
    if (!loan) {
        res.status(HTTP.NOT_FOUND).json({ message: "Loan not found" });
        return;
    }

    // Update status and timestamp
    loan.status = status;
    loan.updatedAt = new Date().toISOString();

    // Send updated loan response
    res.status(HTTP.OK).json({
        message: "Loan status updated successfully",
        data: loan,
    });
};

/**
 * Manages requests and responses to review a Loan.
 * @param req - The express Request object
 * @param res - The express Response object
 * @param next - The express middleware chaining function
 */
export const reviewLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const { id } = req.params;
        const loan = loans.find((l) => l.id === id);

        // If loan not found, return 404
        if (!loan) {
            res.status(HTTP.NOT_FOUND).json({ message: "Loan not found" });
            return;
        }

        // Update loan status to UNDER_REVIEW
        loan.status = "UNDER_REVIEW";
        loan.updatedAt = new Date().toISOString();

        res.status(HTTP.OK).json({
            message: "Loan moved to UNDER_REVIEW status successfully",
            data: loan,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to approve a Loan.
 * @param req - The express Request object
 * @param res - The express Response object
 * @param next - The express middleware chaining function
 */
export const approveLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const { id } = req.params;
        const loan = loans.find((l) => l.id === id);

        // If loan not found, return 404
        if (!loan) {
            res.status(HTTP.NOT_FOUND).json({ message: "Loan not found" });
            return;
        }

        // Update loan status to APPROVED
        loan.status = "APPROVED";
        loan.updatedAt = new Date().toISOString();

        res.status(HTTP.OK).json({
            message: "Loan approved successfully",
            data: loan,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to delete a Loan by ID.
 * @param req - The express Request object
 * @param res - The express Response object
 */
export const deleteLoan = (
    req: Request,
    res: Response
): void => {
    // Filter out the loan with the given ID
    loans = loans.filter((l) => l.id !== req.params.id);

    // Send a success message (204 No Content)
    res.status(HTTP.NO_CONTENT).send();
};
