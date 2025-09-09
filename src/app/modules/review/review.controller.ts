import catchAsync from "../../utils/catchAsync";
import { reviewServices } from "./review.services";
import httpStatus from "http-status";

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewDb(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: "Review created successfully",
    result,
  });
});

const fetchReview = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await reviewServices.fetchReviewDb(productId);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Reviews fetched successfully",
    result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const result = await reviewServices.updateReviewDb(req.body, reviewId);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Review updated successfully",
    result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const result = await reviewServices.deleteReviewDb(reviewId);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Review deleted successfully",
    result,
  });
});

export const reviewController = {
  createReview,
  fetchReview,
  updateReview,
  deleteReview,
};
