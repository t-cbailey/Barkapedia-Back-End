import { addNewPark, getAllParks } from "../models/parks.models";
import { Request, Response } from "express";

export function getParks(req: Request, res: Response) {
  getAllParks()
    .then((returnedParks: Array<Object>) => res.status(200).send(returnedParks))
    .catch((error: Object) => {
      console.error("Error fetching parks:", error);
      res.status(500).send("Internal Server Error");
    });
}

export function addPark(req: Request, res: Response) {
  addNewPark()
    .then(() => res.status(201).send())
    .catch((error: Object) => {
      console.error("Error creating parks:", error);
      res.status(500).send("Internal Server Error");
    });
}