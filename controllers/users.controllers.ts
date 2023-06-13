import { getAllUsers, getUserByID } from "../models/users.models";
import { NextFunction, Request, RequestHandler, Response } from "express";

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
