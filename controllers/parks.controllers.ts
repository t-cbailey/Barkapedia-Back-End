import { addNewPark, getAllParks, getParkByID } from "../models/parks.models";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const getParks: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  getAllParks()
    .then((returnedParks) => res.status(200).send(returnedParks))
    .catch(next);
}

export const getPark: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { park_id } = req.params;
  getParkByID(park_id)
    .then((returnedPark) => res.status(200).send(returnedPark))
    .catch(next);
}

export const addPark: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  addNewPark()
    .then(() => res.status(201).send())
    .catch(next);
}
