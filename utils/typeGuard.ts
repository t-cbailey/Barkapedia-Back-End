import {
  ParkRequest,
  ParkUpdateRequest,
  ReviewRequest,
  ReviewUpdateRequest,
  ReviewVoteRequest,
  UserRequest,
} from "../types/CustomTypes";

export const isValidParkRequest = (obj: any): obj is ParkRequest => {
  const validKeys = [
    "name",
    "desc",
    "size",
    "features",
    "opening_hours",
    "address",
    "image_url",
    "website_url",
    "phone_number",
  ];
  return (
    Object.keys(obj).every((key) => validKeys.includes(key)) &&
    typeof obj.name === "string" &&
    typeof obj.desc === "string" &&
    typeof obj.size === "number" &&
    typeof obj.features === "object" &&
    Array.isArray(obj.features) === false &&
    typeof obj.opening_hours === "object" &&
    typeof obj.address === "object" &&
    typeof obj.image_url === "string" &&
    typeof obj.website_url === "string" &&
    typeof obj.phone_number === "string"
  );
};

export const isValidUserRequest = (obj: any): obj is UserRequest => {
  const validKeys = ["email", "username", "password", "type"];
  return (
    Object.keys(obj).every((key) => validKeys.includes(key)) &&
    typeof obj.email === "string" &&
    typeof obj.username === "string" &&
    typeof obj.password === "string" &&
    typeof obj.type === "string" &&
    (obj.type === "business" || obj.type === "consumer")
  );
};

export const isValidReviewRequest = (obj: any): obj is ReviewRequest => {
  const validKeys = ["park_id", "user_id", "rating", "safety", "AsDescribed", "title", "body"];
  return (
    Object.keys(obj).every((key) => validKeys.includes(key)) &&
    typeof obj.park_id === "string" &&
    typeof obj.user_id === "string" &&
    typeof obj.rating === "number" &&
    typeof obj.safety === "number" &&
    typeof obj.AsDescribed === "boolean" &&
    typeof obj.title === "string" &&
    typeof obj.body === "string"
  );
};

export const isValidReviewUpdateRequest = (
  obj: any
): obj is ReviewUpdateRequest => {
  const validKeys = [
    "review_id",
    "rating",
    "safety",
    "AsDescribed",
    "title",
    "body",
  ];
  return (
    Object.keys(obj).every((key) => validKeys.includes(key)) &&
    typeof obj.review_id === "string" &&
    typeof obj.rating === "number" &&
    typeof obj.safety === "number" &&
    typeof obj.AsDescribed === "boolean" &&
    typeof obj.title === "string" &&
    typeof obj.body === "string"
  );
};

export const isValidReviewVoteRequest = (
  obj: any
): obj is ReviewVoteRequest => {
  const validKeys = ["review_id", "increment"];
  return (
    Object.keys(obj).every((key) => validKeys.includes(key)) &&
    typeof obj.review_id === "string" &&
    typeof obj.increment === "number" &&
    (obj.increment === 1 || obj.increment === -1)
  );
};

export const isValidParkUpdateRequest = (
  obj: any
): obj is ParkUpdateRequest => {
  const validKeys = [
    "park_id",
    "name",
    "desc",
    "size",
    "features",
    "opening_hours",
    "address",
    "image_url",
    "website_url",
    "phone_number"
  ];
  return (
    Object.keys(obj).every((key) => validKeys.includes(key)) &&
    typeof obj.park_id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.desc === "string" &&
    typeof obj.size === "number" &&
    typeof obj.features === "object" &&
    Array.isArray(obj.features) === false &&
    typeof obj.opening_hours === "object" &&
    typeof obj.address === "object" &&
    typeof obj.image_url === "string" &&
    typeof obj.website_url === "string" &&
    typeof obj.phone_number === "string"
  );
};


