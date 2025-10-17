import express from "express";
import request from "supertest";
import { accessLogger, errorLogger } from "../src/api/v1/middleware/logger";

// Mock setup BEFORE importing the logger module
jest.mock("morgan", () => jest.fn(() => (req: any, res: any, next: any) => next()));
jest.mock("express-winston", () => ({
  errorLogger: jest.fn(() => (req: any, res: any, next: any) => next()),
}));

describe("Logging Middleware", () => {
  it("should register and run logging middleware without crashing", async () => {
    const app = express();

    app.use(accessLogger);
    app.use(errorLogger);

    app.get("/", (_req, res) => res.status(200).send("OK"));

    const res = await request(app).get("/");

    // Verify app still works correctly
    expect(res.status).toBe(200);
    expect(res.text).toBe("OK");

    // Verify mocks exist and did not throw
    const morgan = require("morgan");
    expect(morgan).toBeDefined();
  });
});
