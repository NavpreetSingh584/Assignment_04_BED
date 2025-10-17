import express from "express";
import request from "supertest";
import { errorHandler } from "../src/api/v1/middleware/error.middleware";
import { ApiError } from "../src/api/v1/errors/ApiError";

const app = express();

app.get("/error", () => {
  throw ApiError.badRequest("Test error");
});

app.use(errorHandler);

describe("Error Middleware", () => {
  it("should return a formatted error response", async () => {
    const res = await request(app).get("/error");
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      status: 400,
      code: "BAD_REQUEST",
      message: "Test error",
    });
  });
});
