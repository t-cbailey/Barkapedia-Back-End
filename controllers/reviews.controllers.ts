import { getAllReviews } from "../models/reviews.models";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const getReviews: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  getAllReviews()
    .then((returnedReviews) => res.status(200).send(returnedReviews))
    .catch(next)
}
