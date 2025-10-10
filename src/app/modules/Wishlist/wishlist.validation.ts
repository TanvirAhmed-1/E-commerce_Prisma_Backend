import { z } from "zod";

export const wishlistValidation = z.object({
  productId: z.string().uuid({ message: "Invalid product ID" }),
});