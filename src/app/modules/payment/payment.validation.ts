import { z } from "zod";

const paymentTypes = ["Bkash", "CashOnDelivery", "Bank", "Nagod"] as const;

export const PaymentValidation = z.object({
  userId: z.string().uuid({ message: "Invalid user ID" }),
  productId: z.string().uuid({ message: "Invalid product ID" }),
  amount: z.number().positive({ message: "Amount must be greater than 0" }),
  type: z.enum(paymentTypes, {
    // required_error: "Payment type is required",
    message: "Invalid payment type",
  }),
  status: z
    .enum(
      ["PENDING", "COMPLETED", "FAILED", "CANCELLED", "REFUNDED"] as const,
      { message: "Invalid payment status" }
    )
    .optional(),
});
