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
  const { id } = req.params; // optional path param
  const productId = req.query.productId as string | undefined; // optional query param

  let result;
  let message;

  if (id) {
    // Single review by ID
    result = await reviewServices.fetchReviewDb(id);
    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Review not found",
      });
    }
    message = "Single review fetched successfully";
  } else {
    // All reviews or filtered by productId
    result = await reviewServices.fetchReviewDb(productId);
    message = "Reviews fetched successfully";
  }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message,
    result,
  });
});

const fetchSingleReview = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await reviewServices.fetchSingleReviewDB(productId);
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
  fetchSingleReview,
  updateReview,
  deleteReview,
};
