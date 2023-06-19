import db from "../db/connection";
import { Review, ReviewRequest, ReviewVoteRequest } from "../types/CustomTypes";
import { updateParkAverageRating } from "./parks.models";

export const getAllReviews = (): Promise<Review[]> => {
  return db
    .collection("reviews")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as Review;
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
      if (snapshot.empty) {
        return [];
      } else {
        return snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as Review;
        });
      }
    })
    .catch(() => {
      return Promise.reject({
        status: 404,
        msg: `Reviews collection not found`,
      });
    });
};

export const addNewReview = (newReview: ReviewRequest): Promise<Review> => {
  const parksRef = db.collection("reviews");
  return parksRef.get().then((snapshot) => {
    const rid = `review_${snapshot.size + 1}`;
    const returnReview = {
      id: rid,
      votes: 0,
      ...newReview,
    };
    return parksRef
      .doc(rid)
      .set(returnReview)
      .then(() => {
        updateParkAverageRating(returnReview.park_id, returnReview.rating, returnReview.safety);
        return returnReview as Review;
      });
  });
};

export const updateReviewVotesByID = (reviewRequest: ReviewVoteRequest): Promise<Review> => {
  const {review_id, increment } = reviewRequest;
  const reviewRef = db.collection("reviews").doc(review_id);
  return reviewRef.get().then((snapshot) => {
    if (snapshot.exists) {
      const newReviewData = { ...snapshot.data() };
      newReviewData.votes +=  increment;
      return reviewRef.update(newReviewData).then(() => newReviewData as Review);
    };
    return Promise.reject({
      status: 404,
      msg: `No review found for review_id: ${review_id}`,
    });
  });
};