import { z } from "zod";

const paymentTypes = ["Bkash", "CashOnDelivery", "Bank", "Nagod"] as const;
const PaymentStatus = [
  "PENDING",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
  "REFUNDED",
] as const;
export const PaymentValidation = z.object({
  userId: z.string().uuid({ message: "Invalid user ID" }),
  productId: z.string().uuid({ message: "Invalid product ID" }),
  amount: z.number().positive({ message: "Amount must be greater than 0" }),
  type: z.enum(paymentTypes, { message: "Invalid payment type" }),
  paymentStatus: z.enum(PaymentStatus, { message: "Invalid payment status" }),
});
