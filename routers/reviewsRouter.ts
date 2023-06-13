import express, { Router } from "express";
import { getReviews } from '../controllers/reviews.controllers';

const reviewsRouter: Router = express.Router();

reviewsRouter.route('/').get(getReviews);

export default reviewsRouter;