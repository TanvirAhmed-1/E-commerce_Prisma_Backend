import prisma from "../../utils/prisma";
import { IProduct } from "./product.interface";

const createProductDB = async (payload: IProduct) => {
  const result = await prisma.product.create({
    data: payload,
  });
  return result;
};

const fetchProductDB = async () => {
  const result = await prisma.product.findMany();
  return result;
};

const updateProductDB = async (
  payload: Partial<IProduct>,
  productId: string
) => {
  const result = await prisma.product.update({
    where: { id: productId },
    data: payload,
  });
  return result;
};

const deleteProductDB = async (productId: string) => {
  const result = await prisma.product.delete({
    where: { id: productId },
  });
  return result;
};

export const ProductServices = {
  createProductDB,
  fetchProductDB,
  updateProductDB,
  deleteProductDB,
};
