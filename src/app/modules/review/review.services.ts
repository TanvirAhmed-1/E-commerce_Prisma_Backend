import prisma from "../../utils/prisma";
import { IReview } from "./review.interface";

const createReviewDb = async (payload: IReview) => {
  const result = await prisma.review.create({
    data: payload,
  });

  // Update product rating and reviewsCount
  const reviews = await prisma.review.findMany({
    where: { productId: payload.productId },
  });
  const ratingAvg =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  await prisma.product.update({
    where: { id: payload.productId },
    data: { rating: ratingAvg, reviewsCount: reviews.length },
  });

  return result;
};

const fetchReviewDb = async (productId?: string) => {
  const where = productId ? { productId } : {};
  return prisma.review.findMany({
    where,
    include: { user: true },
  });
};

const fetchSingleReviewDB = async (productId: string) => {
  return await prisma.review.findUnique({
    where: { id: productId },
    include: { user: true },
  });
};

const updateReviewDb = async (payload: Partial<IReview>, reviewId: string) => {
  const result = await prisma.review.update({
    where: { id: reviewId },
    data: payload,
  });
  return result;
};

const deleteReviewDb = async (reviewId: string) => {
  const result = await prisma.review.delete({
    where: { id: reviewId },
  });
  return result;
};

export const reviewServices = {
  createReviewDb,
  fetchReviewDb,
  fetchSingleReviewDB,
  updateReviewDb,
  deleteReviewDb,
};
