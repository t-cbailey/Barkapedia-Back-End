import express, { Router } from "express";
import { addReview, getReview, getReviews, getReviewsByPark, updateReview, updateReviewVotes } from '../controllers/reviews.controllers';

const reviewsRouter: Router = express.Router();

reviewsRouter.route('/').get(getReviews);
reviewsRouter.route('/:review_id').get(getReview);
reviewsRouter.route('/:park_id/parks').get(getReviewsByPark);
reviewsRouter.route('/').post(addReview);
reviewsRouter.route('/:review_id').patch(updateReview);
reviewsRouter.route("/:review_id/votes").patch(updateReviewVotes);

export default reviewsRouter;