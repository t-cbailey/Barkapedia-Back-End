const parksRouter = require('express').Router();
import { addPark, getParks } from '../controllers/parks.controllers';

parksRouter.route('/').get(getParks);
parksRouter.route('/').post(addPark);

export default parksRouter;