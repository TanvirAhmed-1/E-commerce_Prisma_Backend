import { z } from "zod";

export const CouponValidation = z.object({
  userId: z.string().uuid({ message: "Invalid user ID" }),
  code: z.string().nonempty({ message: "Code is required and must be unique" }),
  discount: z
    .number()
    .min(0, { message: "Discount must be a positive number" }),
  validFrom: z.date({ message: "validFrom is required" }),
  validTo: z.date({ message: "validTo is required" }),
  active: z.boolean().optional().default(true),
});
