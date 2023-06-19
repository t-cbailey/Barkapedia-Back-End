import express, { Router } from "express";
import {
  addPark,
  deletePark,
  getPark,
  getParks,
  getUserParks,
} from "../controllers/parks.controllers";

const parksRouter: Router = express.Router();

parksRouter.route("/").get(getParks);
parksRouter.route("/:park_id").get(getPark);
parksRouter.route("/").post(addPark);
parksRouter.route("/:park_id").delete(deletePark);
parksRouter.route("/:user_id/users").get(getUserParks);

export default parksRouter;
