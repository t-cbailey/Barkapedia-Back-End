import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed/seed";
import { User } from "../userType";

beforeEach(() => seedDatabase());

describe("GET /api/users", () => {
  test("should return a 200 status code", () => {
    return request(app).get("/api/users").expect(200);
  });
  test("should return an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        body.forEach((user: User) => {
          expect(typeof user.id).toBe("string");
          expect(typeof user.username).toBe("string");
          expect(typeof user.email).toBe("string");
          expect(typeof user.type).toBe("string");
          expect(typeof user.isVerified).toBe("boolean");
          expect(typeof user.reviewUpvotes).toBe("number");
        });
      });
  });
});

describe("GET /api/users/:users_id", () => {
  test("GET /api/users/:users_id should return 200 status code", () => {
    return request(app).get("/api/users/user_1").expect(200);
  });
  test("GET /api/users/:user_id should return an object that matches the shape of a user", () => {
    return request(app)
      .get("/api/users/user_1")
      .expect(200)
      .then((response) => {
        const user: User = response.body;
        expect(typeof user.username).toBe("string");
        expect(typeof user.email).toBe("string");
        expect(typeof user.type).toBe("string");
        expect(typeof user.isVerified).toBe("boolean");
        expect(typeof user.reviewUpvotes).toBe("number");
      });
  });
});
