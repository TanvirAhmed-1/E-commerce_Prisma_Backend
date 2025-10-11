import prisma from "../../utils/prisma";
import { ProductVariantType } from "./productVariant.interface";
import { ProductVariantValidation } from "./productVariant.validation";

const createProductVariantDB = async (payload: ProductVariantType) => {
  const parsed = ProductVariantValidation.parse(payload);

  const variant = await prisma.productVariant.create({
    data: parsed,
  });

  return variant;
};

const fetchProductVariantsDB = async () => {
  return prisma.productVariant.findMany({
    select: {
      id: true,
      sku: true,
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
  const parsed = ProductVariantValidation.partial().parse(payload);

  return prisma.productVariant.update({
    where: { id: variantId },
    data: parsed,
  });
};

export const productVariantServices = {
  updateProductVariantDB,
  createProductVariantDB,
  fetchProductVariantsDB,
  deleteProductVariantDB,
};
