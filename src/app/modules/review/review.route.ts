import express from "express";
import { reviewController } from "./review.controller";

const router = express.Router();

// Create a review
router.post("/reviews", reviewController.createReview);

// Get all reviews for a product
router.get("/reviews", reviewController.fetchReview);

// Update a review by ID
router.put("/reviews/:reviewId", reviewController.updateReview);

// Delete a review by ID
router.delete("/reviews/:reviewId", reviewController.deleteReview);

export const reviewRoute = router;
