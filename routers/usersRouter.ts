const usersRouter = require('express').Router();
import { getUser } from '../controllers/users.controllers';

usersRouter.route('/').get(getUser)

export default usersRouter;