import express, { Router } from "express";
import { createUser, getUser } from "../controllers/users.controllers";
const usersRouter: Router = express.Router();

usersRouter.route("/").get(getUser);
usersRouter.route("/").post(createUser);

export default usersRouter;