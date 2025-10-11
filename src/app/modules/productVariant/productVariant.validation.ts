import { z } from "zod";

// Zod validation for input
export const ProductVariantValidation = z.object({
  productId: z.string().uuid({ message: "Valid productId is required" }),
  sku: z.string().nonempty({ message: "SKU is required" }),
  color: z.string().optional(),
  size: z.string().optional(),
  stock: z.number().int().min(0, { message: "Stock must be >= 0" }),
  price: z.number().min(0, { message: "Price must be >= 0" }),
});
