import { createNewUser, getAllUsers, getUserByID } from "../models/users.models";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { isValidUserRequest } from "../utils/typeGuard";

export const getUsers: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAllUsers()
    .then((returnedUsers) => {
      res.status(200).send(returnedUsers);
    })
    .catch(next);
};

export const getUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  getUserByID(user_id)
    .then((returnedUser) => res.status(200).send(returnedUser))
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
