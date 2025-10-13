import prisma from "../../utils/prisma";
import { IShippingAddress } from "./shippingAddress.interface";


export const ShippingAddressService = {
  // Create new shipping address
  create: async (data: IShippingAddress) => {
    const address = await prisma.shippingAddress.create({
      data: data
    });
    return address;
  },

  // Get all shipping addresses of a user
  getByUser: async (userId: string) => {
    const addresses = await prisma.shippingAddress.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return addresses;
  },

  // Get single address
  getById: async (id: string) => {
    const address = await prisma.shippingAddress.findUnique({
      where: { id },
    });
    return address;
  },

  // Update address
  update: async (id: string, data: any) => {
    const updated = await prisma.shippingAddress.update({
      where: { id },
      data,
    });
    return updated;
  },

  // Delete address
  delete: async (id: string) => {
    const deleted = await prisma.shippingAddress.delete({
      where: { id },
    });
    return deleted;
  },
};
