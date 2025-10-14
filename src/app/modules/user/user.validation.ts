import { z } from "zod";

export const GenderEnum = z.enum(["male", "female", "other"]);

// Create / register schema (required fields)
export const createUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters"),

  address: z
    .string()
    .min(3, "Address must be at least 3 characters")
    .optional(),
  gender: GenderEnum,
});
const updateUserSchema = createUserSchema.partial();
export const userValidation = {
  createUserSchema,
  updateUserSchema,
};

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});
