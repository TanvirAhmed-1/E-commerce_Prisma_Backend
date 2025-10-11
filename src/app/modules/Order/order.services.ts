import prisma from "../../utils/prisma";
import { OrderType } from "./order.interface";

const createOrderDB = async (payload: OrderType) => {
  return prisma.order.create({ data: payload });
};

const getOrderDB = async () => {
  return prisma.order.findMany();
};

const deleteOrderDB = async (orderId: string) => {
  return prisma.order.delete({ where: { id: orderId } });
};

export const orderServices = {
  createOrderDB,
  getOrderDB,
  deleteOrderDB,
};
