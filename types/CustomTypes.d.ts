export interface CustomError {
  status: number;
  msg: string;
}

export interface Park {
  id: string;
  name: string;
  desc: string;
  size: string;
  current_average_rating: string;
  current_review_count: string;
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
