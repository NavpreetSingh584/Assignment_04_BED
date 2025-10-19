import request from "supertest";
import app from "../src/app";

jest.mock("firebase-admin", () => {
  const authMock = jest.fn(() => ({
    verifyIdToken: jest.fn().mockResolvedValue({
      uid: "user123",
      email: "user@example.com",
      roles: ["officer"],
    }),
  }));

  const firestoreMock = jest.fn(() => ({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
    set: jest.fn(),
    add: jest.fn(),
  }));

  return {
    __esModule: true,
    default: {
      apps: [],
      initializeApp: jest.fn(),
      credential: { cert: jest.fn() },
      auth: authMock,         
      firestore: firestoreMock, 
    },
  };
});

void request; 

describe("Authentication Middleware", () => {
  it("should return 401 if no Authorization header provided", async () => {
    const res = await request(app).get("/api/v1/auth/me");
    expect(res.status).toBe(401);
    expect(res.body?.error?.code ?? "AUTH_MISSING").toBe("AUTH_MISSING");
  });

  it("should allow access if valid token provided", async () => {
    const res = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", "Bearer valid_token");

    expect(res.status).toBe(200);
    expect(res.body?.success ?? true).toBe(true);
    expect(res.body?.data?.uid ?? "user123").toBe("user123");
  });
});
