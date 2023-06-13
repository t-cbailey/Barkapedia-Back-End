import { getAllReviews, getReviewsByParkID } from "../models/reviews.models";
import { NextFunction, Request, RequestHandler, Response } from "express";

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
