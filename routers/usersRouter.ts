import express, { Router } from "express";
import { getUser } from '../controllers/users.controllers';
const usersRouter : Router = express.Router()

usersRouter.route('/').get(getUser)

export default usersRouter;





