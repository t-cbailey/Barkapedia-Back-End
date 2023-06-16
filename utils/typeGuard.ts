import { ParkRequest, UserRequest } from "../types/CustomTypes";

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
