import { addNewReview, getAllReviews, getReviewByID, getReviewsByParkID, updateReviewByID } from "../models/reviews.models";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { isValidReviewRequest, isValidReviewUpdateRequest } from "../utils/typeGuard";

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

export const getReview: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { review_id } = req.params;
  getReviewByID(review_id)
    .then((returnedReview) => res.status(200).send(returnedReview))
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
    addNewReview(newReview).then((returnedReview) => res.status(201).send(returnedReview))
    .catch(next);
  }
};

export const updateReview: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { review_id } = req.params;
  const updatedReview = req.body;
  const updatedReviewRequest = { review_id, ...updatedReview };
  if (!review_id || !updatedReview || !isValidReviewUpdateRequest(updatedReviewRequest)) {
    res.status(400).send({ msg: "Invalid review details" });
  } else {
    updateReviewByID(updatedReviewRequest).then((returnedReview) => res.status(200).send(returnedReview))
    .catch(next);
  }
};