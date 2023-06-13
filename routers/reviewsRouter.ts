import express, { Router } from "express";
import { getReviews, getReviewsByPark } from '../controllers/reviews.controllers';

const reviewsRouter: Router = express.Router();

reviewsRouter.route('/').get(getReviews);
reviewsRouter.route('/:park_id').get(getReviewsByPark);

export default reviewsRouter;