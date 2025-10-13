import httpStatus from "http-status";
import prisma from "../../utils/prisma";
import { paymentType } from "./payment.interface";

const createPaymentDB = async (payload: paymentType) => {
  const { userId, productId } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    const error: any = new Error("Invalid userId: User not found");
    error.status = httpStatus.BAD_REQUEST;
    throw error;
  }

  // ✅ Step 2: Validate productId
  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!existingProduct) {
    const error: any = new Error("Invalid productId: Product not found");
    error.status = httpStatus.BAD_REQUEST;
    throw error;
  }

  const result = await prisma.payment.create({
    data: payload,
  });
  return result;
};

// Fetch Payments with selected user & product fields
const fetchPaymentDB = async () => {
  return prisma.payment.findMany({
    select: {
      id: true,
      amount: true,
      type: true,
      paymentStatus: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// 🔴 Delete Payment by ID
const deletePaymentDB = async (paymentId: string) => {
  const findPayment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!findPayment) {
    throw new Error(`Payment with ID ${paymentId} not found`);
  }

  const result = await prisma.payment.delete({
    where: { id: paymentId },
  });

  return result;
};

export const PaymentServices = {
  createPaymentDB,
  fetchPaymentDB,
  deletePaymentDB,
};
