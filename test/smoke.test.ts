import request from "supertest";
import app from "../src/app"; 

describe("Smoke Test", () => {
  it("should return 200 OK on root endpoint", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
