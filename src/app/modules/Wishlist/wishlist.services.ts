import { PrismaClient } from "@prisma/client";
import { Wishlist } from "./wishlist.interface";
const prisma = new PrismaClient();

// Add product to wishlist
const createToWishlist = async (paylode: Wishlist) => {
  const existingProduct = await prisma.product.findUnique({
    where: { id: paylode.productId },
  });

  if (!existingProduct) {
    throw new Error("Product id is Invalid");
  }

  const existing = await prisma.wishlist.findUnique({
    where: { id: paylode.productId },
  });

  if (!existing) {
    throw new Error("Product already in wishlist");
  }

  return prisma.wishlist.create({
    data: paylode,
  });
};

// Remove product from wishlist
const deleteFromWishlist = async (wishlistId: string) => {
  return prisma.wishlist.delete({
    where: { id: wishlistId },
  });
};

// Get all wishlist items for a user
const getUserWishlist = (userId: string) => {
  return prisma.wishlist.findMany({
    where: { userId },
    include: { product: true, user: true },
  });
};

// Get all wishlist items for a user
const getAllWishlistDB = () => {
  return prisma.wishlist.findMany({
    include: { product: true, user: true },
  });
};

export const wishlistServices = {
  createToWishlist,
  deleteFromWishlist,
  getUserWishlist,
  getAllWishlistDB,
};
