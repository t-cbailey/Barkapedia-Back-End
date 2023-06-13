import express, { Router } from "express";
import { addPark, getPark, getParks } from "../controllers/parks.controllers";

const parksRouter: Router = express.Router();

parksRouter.route("/").get(getParks);
parksRouter.route("/:park_id").get(getPark);
parksRouter.route("/").post(addPark);

export default parksRouter;