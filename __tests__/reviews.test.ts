import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed/seed";
import { Review } from "../types/CustomTypes";

beforeEach(() => seedDatabase());

describe("GET /api/reviews", () => {
  test("GET /api/reviews should return 200 status code", () => {
    return request(app).get(`/api/reviews`).expect(200);
  });
  test("GET /api/reviews should return a review of the correct shape", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        const reviewsArray = response.body;
        reviewsArray.forEach((review: Review) => {
          expect(typeof review.park_id).toBe("string");
          expect(typeof review.user_id).toBe("string");
          expect(typeof review.rating).toBe("number");
          expect(typeof review.title).toBe("string");
          expect(typeof review.body).toBe("string");
          expect(typeof review.votes).toBe("number");
        });
      });
  });
});

describe("GET /api/reviews/user_id", () => {
  test("GET /api/reviews/:user_id should return 200 status code", () => {
    return request(app).get(`/api/reviews/user_1`).expect(200);
  });
  test("GET /api/reviews/user_1 should return a review of the correct shape", () => {
    return request(app)
      .get("/api/reviews/user_1")
      .expect(200)
      .then((response) => {
        const reviewsArray = response.body;
        reviewsArray.forEach((review: Review) => {
          expect(typeof review.park_id).toBe("string");
          expect(typeof review.user_id).toBe("string");
          expect(typeof review.rating).toBe("number");
          expect(typeof review.title).toBe("string");
          expect(typeof review.body).toBe("string");
          expect(typeof review.votes).toBe("number");
        });
      });
  });
  test("GET /api/reviews/user_1 should return an empty array when given an user id that has no reviews", () => {
    return request(app)
      .get("/api/reviews/user_abc")
      .expect(200)
      .then((response) => {
        const reviewsArray = response.body;
        expect(reviewsArray).toEqual([]);
      });
  });
});
