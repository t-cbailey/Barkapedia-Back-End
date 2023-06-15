import { addNewPark, getAllParks, getParkByID } from "../models/parks.models";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { isPark } from "../utils/typeGuard";

export const getParks: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const city = req.query.city as string;
  const rating = Number(req.query.rating) as number;
  const isFree = Boolean(req.query.isFree) as boolean;
  const isWellLit = Boolean(req.query.isWellLit) as boolean;

  getAllParks({ city, rating, isFree, isWellLit })
    .then((returnedParks) => res.status(200).send(returnedParks))
    .catch(next);
};

export const getPark: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { park_id } = req.params;
  getParkByID(park_id)
    .then((returnedPark) => res.status(200).send(returnedPark))
    .catch(next);
};

export const addPark: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newPark = req.body;
  if (!newPark || !isPark(newPark)) {
    res.status(400).send({ msg: "Invalid park details" });
  } else {
    addNewPark(newPark)
      .then((returnedPark) => res.status(201).send(returnedPark))
      .catch(next);
  }
};
