import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Add product to wishlist
const createToWishlist = async (userId: string, productId: string) => {
  const existing = await prisma.wishlist.findFirst({
    where: { userId, productId },
  });

  if (existing) {
    throw new Error("Product already in wishlist");
  }

  return prisma.wishlist.create({
    data: { userId, productId },
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
