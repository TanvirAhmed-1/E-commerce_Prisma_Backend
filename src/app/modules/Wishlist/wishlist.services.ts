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
const deleteFromWishlist = async (userId: string, productId: string) => {
  return prisma.wishlist.deleteMany({
    where: { userId, productId },
  });
};

// Get all wishlist items for a user
const getUserWishlist = (userId: string) => {
  return prisma.wishlist.findMany({
    where: { userId },
    include: { product: true },
  });
};

export const wishlistServices = {
  createToWishlist,
  deleteFromWishlist,
  getUserWishlist,
};
