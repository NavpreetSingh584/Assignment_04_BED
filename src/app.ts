// import the express application and type definition
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "../src/api/v1/routes/auth.routes";
import adminRouter from "../src/api/v1/routes/admin.routes";

// route imports
import v1Routes from "./api/v1/routes";

// middleware imports
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import { errorHandler } from "./api/v1/middleware/error.middleware";

// initialize the express application
const app: Express = express();

/**
 * Interface for health check response
 * Defines the structure of the object returned by the health endpoint.
 */
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}


// Middleware START

// security middleware to add HTTP headers protection
app.use(helmet());

// enable Cross-Origin Resource Sharing for all origins
app.use(cors());

// Ensures incoming request bodies are parsed as JSON
app.use(express.json());

// loggers (access, error, console)
app.use(accessLogger);
app.use(errorLogger);
app.use(consoleLogger);


// Middleware END


// Root and Health Check Routes

// basic root route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running successfully" });
});

/**
 * Health check endpoint that returns server status information.
 * Helps monitor uptime and version for DevOps and CI/CD pipelines.
 */
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

// API Routes START

// prefixes all version 1 API routes with "/api/v1"
app.use("/api/v1", v1Routes);

// mount authentication and admin routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);

// API Routes END


// Global Error Handling (MUST BE LAST)
app.use(errorHandler);

// export the express app
export default app;
