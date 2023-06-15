export interface CustomError {
  status: number;
  msg: string;
}

export interface AuthError extends Error {
  errorInfo: {
    code: string;
    message: string;
  };
  codePrefix: string;
}

export interface ParkRequest {
  name: string;
  desc: string;
  size: number;
  features: string[];
  opening_hours: {
    [key: string]: string;
  };
  address: {
    firstLine: string;
    secondLine: string;
    postCode: string;
    city: string;
  };
  image_url: string;
  website_url: string;
  phone_number: string;
}

export interface Park {
  id: string;
  name: string;
  desc: string;
  size: number;
  current_average_rating: number;
  current_review_count: number;
  features: string[];
  opening_hours: {
    [key: string]: string;
  };
  address: {
    firstLine: string;
    secondLine: string;
    postCode: string;
    city: string;
  };
  location: {
    long: string;
    lat: string;
  };
  image_url: string;
  website_url: string;
  phone_number: string;
}

export interface Review {
  review_id: string;
  park_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  votes: number;
}

export interface UserRequest {
  email: string;
  username: string;
  password: string;
  type: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  type: string;
  isVerified: boolean;
  reviewUpvotes: number;
}
