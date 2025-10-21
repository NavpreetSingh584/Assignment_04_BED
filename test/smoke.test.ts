import request from "supertest";
import app from "../src/app"; 

describe("Smoke Test", () => {
  it("should return 200 OK on root endpoint", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should return health data on /api/v1/health", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "OK");
    expect(res.body).toHaveProperty("uptime");
  });

   it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/api/v1/unknown");
    expect(res.status).toBe(404);
  });
});
