export interface CustomError {
  status: number;
  msg: string;
}

export interface Park {
  id: string;
  name: string;
  desc: string;
  size: number;
  current_average_rating: number;
  current_review_count: number;
  features: {
    isFree: boolean;
    isWellLit: boolean;
    isFreeParking: boolean;
    isParking: boolean;
    hasAgilityEquipment: boolean;
    isFullyEnclosed: boolean;
    hasDisabledAccess: boolean;
  };
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

export interface ParkQuery {
  city?: string;
  rating?: number;
  isFree?: boolean;
  isWellLit?: boolean;
  isFreeParking?: boolean;
  isParking?: boolean;
  hasAgilityEquipment?: boolean;
  isFullyEnclosed?: boolean;
  hasDisabledAccess?: boolean;
  orderBy?: any;
}
