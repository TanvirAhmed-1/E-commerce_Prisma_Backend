import slugify from "slugify";
import prisma from "../../utils/prisma";
import { IProduct } from "./product.interface";

interface ISearchParams {
  name?: string;
  category?: string;
}

const createProductDB = async (payload: IProduct) => {

  //  create sku
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const sku = `SKU-${datePart}-${randomPart}`;
  // create sura
const slug = `${randomPart}-${slugify(payload.name, { lower: true, strict: true })}-d`;
  const payloadData={
     ...payload,
        slug,
        sku,
  }
  return prisma.product.create({ data: payloadData });
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
  const { name, category} = params;

  const whereClause: any = {};


  if (name) {
    whereClause.name = { contains: name, mode: "insensitive" };
  }

  // ✅ Search by category (relation or string)
  if (category) {
    // If category is a relation
    whereClause.category = {
      name: { contains: category, mode: "insensitive" },
    };


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
