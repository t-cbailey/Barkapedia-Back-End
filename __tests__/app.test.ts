import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed/seed";

beforeEach(() => seedDatabase());

describe("GET /api/ non-existent endpoint", () => {
  test("GET /api/{non-existent endpoint} should return 404 status code", () => {
    return request(app).get("/api/sdfjksfjl").expect(404);
  });
  test("GET /api/{non-existent endpoint} should return 404 status code", () => {
    return request(app).get("/api/sdfjksfjl").expect(404);
  });
});

describe("GET /api/parks", () => {
  test("GET /api/parks should return 200 status code", () => {
    return request(app).get("/api/parks").expect(200);
  });
  test("GET /api/parks should return an an array of objects that matches the test data", () => {
    return request(app)
      .get("/api/parks")
      .expect(200)
      .then((response) => {
        const parksArray = response.body;
        expect(parksArray.length === 2).toBe(true);
      });
  });
});

