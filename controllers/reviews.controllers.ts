import {
  addNewReview,
  getAllReviews,
  getReviewsByParkID,
} from "../models/reviews.models";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { isValidReviewRequest } from "../utils/typeGuard";
import { getUserByID } from "../models/users.models";

export const getReviews: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAllReviews()
    .then((returnedReviews) => {
      const userPromises = returnedReviews.map((review) => {
        return getUserByID(review.user_id);
      });

      Promise.all(userPromises)
        .then((users) => {
          const reviewsWithUsername = returnedReviews.map((review, index) => {
            return {
              ...review,
              username: users[index].username,
            };
          });
          res.status(200).send(reviewsWithUsername);
        })
        .catch(next);
    })
    .catch(next);
};

export const getReviewsByPark: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { park_id } = req.params;
  getReviewsByParkID(park_id)
    .then((returnedReviews) => {
      const userPromises = returnedReviews.map((review) => {
        return getUserByID(review.user_id)
      })

    Promise.all(userPromises)
    .then((users) => {
    const reviewsWithUsername = returnedReviews.map((review, index) => {
        return {
          ...review,
          username: users[index].username,
        }
      })
      res.status(200).send(reviewsWithUsername)
    })
    .catch(next)
    })
    .catch(next);
};

export const addReview: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newReview = req.body;
  if (!newReview || !isValidReviewRequest(newReview)) {
    res.status(400).send({ msg: "Invalid review details" });
  } else {
    addNewReview(newReview)
      .then((returnedReview) => res.status(201).send(returnedReview))
      .catch(next);
  }
};
