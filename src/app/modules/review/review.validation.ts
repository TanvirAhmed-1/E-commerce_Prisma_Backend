import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
  comment: z.string().optional(),
  userId: z.string().nonempty("User ID is required"),
  productId: z.string().nonempty("Product ID is required"),
});

export const updateReviewSchema = createReviewSchema.partial();

export const reviewValidation = {
  createReviewSchema,
  updateReviewSchema,
};
