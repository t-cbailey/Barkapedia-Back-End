import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed/seed";
import { Review } from "../types/CustomTypes";
import reviewData from "../db/data/test-data/reviews.json";

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

describe("GET /api/reviews/:park_id", () => {
  test("GET /api/reviews/:park_id should return 200 status code", () => {
    return request(app).get(`/api/reviews/park_1`).expect(200);
  });
  test("GET /api/reviews/park_1 should return a review of the correct shape", () => {
    return request(app)
      .get("/api/reviews/park_1")
      .expect(200)
      .then((response) => {
        const reviewsArray = response.body;
        expect(reviewsArray.length > 0).toBe(true);
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
      .get("/api/reviews/park_abc")
      .expect(200)
      .then((response) => {
        const reviewsArray = response.body;
        expect(reviewsArray).toEqual([]);
      });
  });
});

describe("POST /api/reviews/", () => {
  test("POST /api/reviews should return 201 status code when given a valid review request", () => {
    const validReviewRequest = {
      "park_id": "park_8",
      "user_id": "user_8",
      "rating": 4,
      "safety": 4,
      "AsDescribed": true,
      "title": "Beautiful scenery",
      "body": "The park offers breathtaking views and is a great spot for photography.",
    };
    return request(app).post("/api/reviews/").send(validReviewRequest).expect(201);
  });
  test("POST /api/reviews/ should accepted the review when given a review park", () => {
    const requestInput = {
      "park_id": "park_8",
      "user_id": "user_8",
      "rating": 4,
      "safety": 4,
      "AsDescribed": true,
      "title": "Beautiful scenery",
      "body": "The park offers breathtaking views and is a great spot for photography.",
    };
    const expectedOutput = {
      "id": `review_${reviewData.length + 1}`,
      "park_id": "park_8",
      "user_id": "user_8",
      "rating": 4,
      "safety": 4,
      "AsDescribed": true,
      "title": "Beautiful scenery",
      "body": "The park offers breathtaking views and is a great spot for photography.",
      "votes": 0
    };
    return request(app)
      .post("/api/reviews/")
      .send(requestInput)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(expectedOutput);
      });
  });
  test("POST /api/reviews should return 400 status code when given no park", () => {
    return request(app).post("/api/reviews/").send().expect(400);
  });
  test("POST /api/reviews should return 400 status code when given a park with missing data", () => {
    const missingRating = {
      "park_id": "park_8",
      "user_id": "user_8",
      "safety": 4,
      "AsDescribed": true,
      "title": "Beautiful scenery",
      "body": "The park offers breathtaking views and is a great spot for photography.",
    };
    return request(app)
      .post("/api/reviews/")
      .send(missingRating)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review details");
      });
  });
  test("POST /api/reviews should return 400 status code when given invalid data", () => {
    const invalidRating = {
      "park_id": "park_8",
      "user_id": "user_8",
      "rating": "Hello World",
      "safety": 4,
      "AsDescribed": true,
      "title": "Beautiful scenery",
      "body": "The park offers breathtaking views and is a great spot for photography.",
    };
    return request(app)
      .post("/api/reviews/")
      .send(invalidRating)
      .expect(400)
      .then((response) => {
        const message: string = response.body.msg;
        expect(message).toBe("Invalid review details");
      });
  });
});

