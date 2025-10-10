import prisma from "../../utils/prisma";
import { IProduct } from "./product.interface";

interface ISearchParams {
  name?: string;
  category?: string;
  productid?: string;
}

const createProductDB = async (payload: IProduct) => {
  return prisma.product.create({ data: payload });
};

const fetchProductDB = async () => {
  return prisma.product.findMany({
    include: { category: true }, // optional if you have relation
  });
};

const fetchSingleProductDB = async (productId: string) => {
  return prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });
};

const searchProductsDB = async (params: ISearchParams) => {
  const { name, category, productid } = params;

  const whereClause: any = {};

  if (productid) {
    return await prisma.product.findUnique({
      where: { id: productid },
      include: { category: true },
    });
  }
  // ✅ Search by name (if provided)
  if (name) {
    whereClause.name = { contains: name, mode: "insensitive" };
  }

  // ✅ Search by category (relation or string)
  if (category) {
    // If category is a relation
    whereClause.category = {
      name: { contains: category, mode: "insensitive" },
    };

    // 👉 OR if category is just a string field, use this instead:
    // whereClause.category = { contains: category, mode: "insensitive" };
  }

  return prisma.product.findMany({
    where: whereClause,
    include: { category: true },
  });
};

const updateProductDB = async (
  payload: Partial<IProduct>,
  productId: string
) => {
  return prisma.product.update({
    where: { id: productId },
    data: payload,
  });
};

const deleteProductDB = async (productId: string) => {
  return prisma.product.delete({
    where: { id: productId },
  });
};

export const ProductServices = {
  createProductDB,
  fetchProductDB,
  fetchSingleProductDB,
  searchProductsDB,
  updateProductDB,
  deleteProductDB,
};
