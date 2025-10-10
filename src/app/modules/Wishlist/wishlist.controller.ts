import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { wishlistServices } from "./wishlist.services";
import { wishlistValidation } from "./wishlist.validation";

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const { productId } = wishlistValidation.parse(req.body);
  const userId = req.user!.id; // ✅ 'user' small letter, ! ensures TypeScript it's defined

  const wishlistItem = await wishlistServices.createToWishlist(userId, productId);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Product added to wishlist",
    result: wishlistItem,
  });
});

const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const userId = req.user!.id;

  await wishlistServices.deleteFromWishlist(userId, productId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Product removed from wishlist",
  });
});

const getUserWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const wishlist = await wishlistServices.getUserWishlist(userId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User wishlist fetched successfully",
    result: wishlist,
  });
});

export const wishlistController = {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
};
