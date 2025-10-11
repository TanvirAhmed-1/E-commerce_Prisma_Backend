import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { wishlistServices } from "./wishlist.services";
import { wishlistValidation } from "./wishlist.validation";

const addToWishlist = catchAsync(async (req, res) => {
  const { productId, userId } = wishlistValidation.parse(req.body);
  //const userId = req.user!.id; // ✅ 'user' small letter, ! ensures TypeScript it's defined

  const wishlistItem = await wishlistServices.createToWishlist(
    userId,
    productId
  );

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Product added to wishlist",
    result: wishlistItem,
  });
});

const removeFromWishlist = catchAsync(async (req, res) => {
  const { wishlistId } = req.params;
  //const userId = req.user!.id;

  await wishlistServices.deleteFromWishlist(wishlistId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "wishlist Delete Successfully",
  });
});

const getUserWishlist = catchAsync(async (req, res) => {
  //const userId = req.user!.id;
  const { userId } = req.params;

  const wishlist = await wishlistServices.getUserWishlist(userId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User wishlist fetched successfully",
    result: wishlist,
  });
});

const getAllWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistServices.getAllWishlistDB();

  res.status(httpStatus.OK).json({
    success: true,
    message: "All wishlist fetched successfully",
    result: wishlist,
  });
});

export const wishlistController = {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
  getAllWishlist,
};
