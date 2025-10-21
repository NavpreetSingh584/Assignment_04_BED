import { Request, Response, NextFunction } from "express";
import httpMocks from "node-mocks-http";

jest.mock("morgan", () => {
  return jest.fn(() => (req: any, res: any, next: any) => {
    if (next) next(); // simulate morgan calling next()
  });
});

import { accessLogger, consoleLogger } from "../src/api/v1/middleware/logger";

describe("Logger Middleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: "GET",
      url: "/test",
      headers: { "user-agent": "jest-test" },
    }) as unknown as Request;

    res = httpMocks.createResponse() as unknown as Response;
    next = jest.fn();
  });

  it("should call next in accessLogger", () => {
    accessLogger(req, res, next);
    expect(next).toHaveBeenCalled(); 
  });

  it("should call next in consoleLogger", () => {
    consoleLogger(req, res, next);
    expect(next).toHaveBeenCalled(); 
  });
});
