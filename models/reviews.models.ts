import db from "../db/connection";
import { Review } from "../types/CustomTypes";

export const getAllReviews = (): Promise<Review[]> => {
  return db
    .collection("reviews")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => {
          const review_id = doc.id;
          const data = doc.data();
          return { review_id, ...data } as Review;
        });
      }
      return Promise.reject({
        status: 404,
        msg: `Reviews collection not found`,
      });
    });
};

export const getReviewsByParkID = (park_id: string): Promise<Review[]> => {
  return db
    .collection("reviews")
    .where("park_id", "==", park_id)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => {
          const review_id = doc.id;
          const data = doc.data();
          return { review_id, ...data } as Review;
        });
      }
      return Promise.reject({
        status: 404,
        msg: `No reviews found for park_id: ${park_id}`,
      });
    });
};
