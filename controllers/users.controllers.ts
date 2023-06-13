import { getAllUsers} from "../models/users.models";
import { Request, Response } from "express";
import { User } from "../userType";

export function getUser(req:Request, res: Response){
    getAllUsers().then((returnedUsers : Array<User>) => {
    res.status(200)
    .send(returnedUsers)})
    .catch((error:Object)=> {
      console.error("Error fetching users:", error);
      res.status(500)
      .send('Internal Server')
    })
  }

