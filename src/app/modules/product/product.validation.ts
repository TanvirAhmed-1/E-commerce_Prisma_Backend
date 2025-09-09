import { z } from "zod";

export const CurrencyEnum = z.enum(["BDT", "USD", "EUR"]);

// Create Product Schema
export const createProductSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  slug: z.string().nonempty("Slug is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be greater than 0"),
  discountPrice: z.number().optional(),
  currency: CurrencyEnum.optional().default("BDT"),
  stock: z.number().min(0, "Stock cannot be negative").default(0),
  sku: z.string().nonempty("SKU is required"),
  brand: z.string().optional(),
  images: z.array(z.string().url("Must be a valid URL")).optional(),
  thumbnail: z.string().url("Must be a valid URL").optional(),
  categoryId: z.string().nonempty("Category is required"),
});

// Export for use in controllers
export const productValidation = {
  createProductSchema,
};
