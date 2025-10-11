import { z } from "zod";

export const OrdertValidation = z.object({
  productId: z.string().uuid({ message: "Invalid product ID" }),
  userId :z.string().uuid({ message: "Invalid user ID" }), 
});