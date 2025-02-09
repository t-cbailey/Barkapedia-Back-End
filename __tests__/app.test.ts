import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed/seed";

beforeEach(() => seedDatabase());

describe("GET /api/ non-existent endpoint", () => {
  test("GET /api/{non-existent endpoint} should return 404 status code", () => {
    return request(app).get("/api/sdfjksfjl").expect(404);
  });
});
