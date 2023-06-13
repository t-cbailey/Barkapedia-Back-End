import express, { Router } from "express";
import { getUser, getUsers } from '../controllers/users.controllers';
const usersRouter : Router = express.Router()

usersRouter.route('/').get(getUsers)
usersRouter.route('/:user_id').get(getUser)

export default usersRouter;





