import {
  addNewPark,
  deleteParkByID,
  getAllParks,
  getParkByID,
} from "../models/parks.models";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { isValidParkRequest } from "../utils/typeGuard";

export const getParks: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAllParks()
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
  if (!newPark || !isValidParkRequest(newPark)) {
    res.status(400).send({ msg: "Invalid park details" });
  } else {
    addNewPark(newPark)
      .then((returnedPark) => res.status(201).send(returnedPark))
      .catch(next);
  }
};

export const deletePark: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { park_id } = req.params;
  deleteParkByID(park_id)
    .then(() => res.status(204).send())
    .catch(next);
};
