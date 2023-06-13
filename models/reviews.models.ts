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
