import {
  addNewReview,
  getAllReviews,
  getReviewsByParkID,
  updateReviewVotesByID,
} from "../models/reviews.models";
import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  isValidReviewRequest,
  isValidReviewVoteRequest,
} from "../utils/typeGuard";

export const getReviews: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAllReviews()
    .then((returnedReviews) => res.status(200).send(returnedReviews))
    .catch(next);
};

export const getReviewsByPark: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { park_id } = req.params;
  getReviewsByParkID(park_id)
    .then((returnedReviews) => res.status(200).send(returnedReviews))
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

export const updateReviewVotes: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const review_id = req.params.review_id;
  const increment = req.body.increment;
  const newReviewVote = { review_id, increment };
  if (!review_id || !increment || !isValidReviewVoteRequest(newReviewVote)) {
    res.status(400).send({ msg: "Invalid review vote details" });
  } else {
    updateReviewVotesByID(newReviewVote)
      .then((updatedReview) => res.status(200).send(updatedReview))
      .catch(next);
  }
};
