import prisma from "../../utils/prisma";
import { IShippingAddress } from "./shippingAddress.interface";

// Create new shipping address
const createDB = async (data: IShippingAddress) => {
  return await prisma.shippingAddress.create({
    data: data,
  });
};

// Get all shipping addresses of a user
const getByUserDB = async (userId: string) => {
  return await prisma.shippingAddress.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

// Update address
const updateDB = async (id: string, data: any) => {
  const exitingId = await prisma.shippingAddress.findUnique({
    where: { id: id },
  });
  if (!exitingId) {
    throw new Error("Params id is Invalid ");
  }
  return await prisma.shippingAddress.update({
    where: { id: id },
    data,
  });
};

// Delete address
const deleteDB = async (id: string) => {
  const exitingId = await prisma.shippingAddress.findUnique({
    where: { id: id },
  });
  if (!exitingId) {
    throw new Error("Params Id  is Invalid ");
  }
  return await prisma.shippingAddress.delete({
    where: { id: id },
  });
};

export const ShippingAddressService = {
  getByUserDB,
  createDB,
  deleteDB,
  updateDB,
};
