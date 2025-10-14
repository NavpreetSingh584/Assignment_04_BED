/**
 * Represents the possible statuses of a loan application.
 * - PENDING: The loan has been submitted but not yet reviewed.
 * - UNDER_REVIEW: The loan is currently being assessed by an officer.
 * - APPROVED: The loan has been approved and verified.
 * - REJECTED: The loan has been denied due to risk or policy issues.
 */
export type LoanStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

/**
 * Interface representing a high-risk loan application.
 * Provides structure for loan records stored or retrieved via the API.
 */
export interface Loan {
    /** Unique identifier for the loan application */
    id: string;

    /** Full name of the applicant submitting the loan request */
    applicantName: string;

    /** Requested loan amount (in currency units) */
    amount: number;

    /** Calculated risk score for the applicant  */
    riskScore: number;

    /** Current processing status of the loan application */
    status: LoanStatus;

    /** Date and time when the loan application was created  */
    createdAt: string;

    /** Date and time when the loan application was last updated  */
    updatedAt: string;
}
