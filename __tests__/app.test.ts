import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed/seed";

beforeEach(() => seedDatabase());

describe("GET /api/ non-existent endpoint", () => {
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
        expect(parksArray.length === 9).toBe(true);
      });
  });
});

interface User{
id:string;
username:string;
email:string;
type:string;
isVerified:boolean;
reviewUpvotes:number
}

describe.only("GET /api/users", () => {
test('should return a 200 status code', () => {
  return request(app).get('/api/users').expect(200)
});
test('should return an array of user objects', () => {
  return request(app).get('/api/users').expect(200).then(({body})=>{
    expect(Array.isArray(body)).toBe(true);
    body.forEach((user:User) => {
      expect(typeof user.id).toBe('string');
      expect(typeof user.username).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.type).toBe('string');
      expect(typeof user.isVerified).toBe('boolean');
      expect(typeof user.reviewUpvotes).toBe('number');
    });
  })
});
})

