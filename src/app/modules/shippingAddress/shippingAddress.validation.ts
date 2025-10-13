import { z } from "zod";

// Create / Update validation
export const ShippingAddressSchema = z.object({
  userId: z.string().uuid({ message: "Invalid user ID" }),
  division: z.string().min(2, "Division is required"),
  district: z.string().min(2, "District is required"),
  street: z.string().min(2, "Street is required"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
    .regex(/^[0-9]+$/, "Phone must contain only digits"),
  postalCode: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export const CreateShippingAddressValidator = (data: any) =>
  ShippingAddressSchema.parse(data);
export const UpdateShippingAddressValidator = (data: any) =>
  ShippingAddressSchema.partial().parse(data);
