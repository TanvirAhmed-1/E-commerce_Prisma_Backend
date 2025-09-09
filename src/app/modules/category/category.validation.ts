import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  slug: z.string().nonempty("Slug is required"),
});

export const categoryValidation = {
  createCategorySchema,
};
