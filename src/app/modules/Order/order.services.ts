import prisma from "../../utils/prisma";
import { OrderType } from "./order.interface";

const createOrderDB = async (payload: OrderType) => {
    const exitingId = await prisma.product.findUnique({
    where: { id:payload.productId },
  });
  if (!exitingId) {
    throw new Error(" Product id Not Fund!");
  }
  return prisma.order.create({ data: payload });
};

const getOrderDB = async () => {
  return prisma.order.findMany();
};

const deleteOrderDB = async (orderId: string) => {
  const exitingId = await prisma.order.findUnique({
    where: { id: orderId },
  });
  if (!exitingId) {
    throw new Error("Id Not Fund!");
  }
  return prisma.order.delete({ where: { id: orderId } });
};

export const orderServices = {
  createOrderDB,
  getOrderDB,
  deleteOrderDB,
};
