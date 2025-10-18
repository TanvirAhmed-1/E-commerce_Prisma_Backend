import prisma from "../../utils/prisma";
import { ProductVariantType } from "./productVariant.interface";
import { ProductVariantValidation } from "./productVariant.validation";

const createProductVariantDB = async (payload: ProductVariantType) => {
  const existingProduct = await prisma.product.findUnique({
    where: { id: payload.productId },
  });
  if (!existingProduct) {
    throw new Error("Invalid productId: Product not found");
  }

  return await prisma.productVariant.create({ data: payload });
};

const fetchProductVariantsDB = async () => {
  return prisma.productVariant.findMany({
    select: {
      id: true,
      color: true,
      size: true,
      stock: true,
      price: true,
      createdAt: true,
      updatedAt: true,
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

const deleteProductVariantDB = async (variantId: string) => {
  const existing = await prisma.productVariant.findUnique({
    where: { id: variantId },
  });

  if (!existing)
    throw new Error(`ProductVariant with ID ${variantId} not found`);

  return prisma.productVariant.delete({
    where: { id: variantId },
  });
};

const updateProductVariantDB = async (
  variantId: string,
  payload: Partial<ProductVariantType>
) => {
  const existingProduct = await prisma.product.findUnique({
    where: { id: payload.productId },
  });
  if (!existingProduct) {
    throw new Error("Invalid productId: Product not found");
  }

  const existingvId = await prisma.productVariant.findUnique({
    where: { id: variantId },
  });
  if (!existingvId) {
    throw new Error("Invalid params id is not found");
  }

  return prisma.productVariant.update({
    where: { id: variantId },
    data: payload,
  });
};

export const productVariantServices = {
  updateProductVariantDB,
  createProductVariantDB,
  fetchProductVariantsDB,
  deleteProductVariantDB,
};
