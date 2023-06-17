import express, { Router } from "express";
import { addReview, getReviews, getReviewsByPark, updateReview } from '../controllers/reviews.controllers';

const reviewsRouter: Router = express.Router();

reviewsRouter.route('/').get(getReviews);
reviewsRouter.route('/:park_id').get(getReviewsByPark);
reviewsRouter.route('/').post(addReview);
reviewsRouter.route('/:review_id').patch(updateReview);

export default reviewsRouter;