import { Park } from "../types/CustomTypes";

export const isPark = (obj: any): obj is Park => {
  return (
    typeof obj.name === "string" &&
    typeof obj.desc === "string" &&
    typeof obj.size === "number" &&
    typeof obj.current_average_rating === "number" &&
    typeof obj.current_review_count === "number" &&
    typeof obj.features === "object" &&
    typeof obj.opening_hours === "object" &&
    typeof obj.address === "object" &&
    typeof obj.location === "object" &&
    typeof obj.image_url === "string" &&
    typeof obj.website_url === "string" &&
    typeof obj.phone_number === "string"
  );
};
