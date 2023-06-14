import { createNewUser, getAllUsers } from "../models/users.models";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../types/CustomTypes";
import { isValidUserRequest } from "../utils/typeGuard";

export const getUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAllUsers()
    .then((returnedUsers: Array<User>) => {
      res.status(200).send(returnedUsers);
    })
    .catch(next);
};

export const createUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser = req.body;
  if (!newUser || !isValidUserRequest(newUser)) {
    res.status(400).send({ msg: "Invalid user details" });
  } else {
    createNewUser(newUser)
      .then((returnedUser) => {
        res.status(201).send(returnedUser);
      })
      .catch(next);
  }
};
