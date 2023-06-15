import { Park, ReviewRequest, UserRequest } from "../types/CustomTypes";

export const isPark = (obj: any): obj is Park => {
  return (
    typeof obj.name === "string" &&
    typeof obj.desc === "string" &&
    typeof obj.size === "number" &&
    typeof obj.current_average_rating === "number" &&
    typeof obj.current_review_count === "number" &&
    Array.isArray(obj.features) &&
    typeof obj.opening_hours === "object" &&
    typeof obj.address === "object" &&
    typeof obj.location === "object" &&
    typeof obj.image_url === "string" &&
    typeof obj.website_url === "string" &&
    typeof obj.phone_number === "string"
  );
};

export const isValidUserRequest = (obj: any): obj is UserRequest => {
  return (
    typeof obj.email === "string" &&
    typeof obj.username === "string" &&
    typeof obj.password === "string" &&
    typeof obj.type === "string" &&
    (obj.type === "business" || obj.type === "consumer")
  );
};

export const isValidReviewRequest = (obj: any): obj is ReviewRequest => {
  return (
    typeof obj.park_id === "string" &&
    typeof obj.user_id === "string" &&
    typeof obj.rating === "number" &&
    typeof obj.title === "string" &&
    typeof obj.body === "string"
  );
};
