import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { productRoute } from "../modules/product/product.route";
import { reviewRoute } from "../modules/review/review.route";
import { categoryRoute } from "../modules/category/category.route";
import { wishlistRoute } from "../modules/wishlist/wishlist.route";
import { orderRoute } from "../modules/Order/order.route";
import { paymentRoute } from "../modules/payment/payment.route";
import { couponRouter } from "../modules/coupon/coupon.route";
import { variantRoute } from "../modules/productVariant/productVariant.route";
import { ShippingAddressRoutes } from "../modules/shippingAddress/shippingAddress.routes";

const router = Router();

const allRouters = [
  UserRouter,
  productRoute,
  wishlistRoute,
  reviewRoute,
  categoryRoute,
  orderRoute,
  paymentRoute,
  couponRouter,
  variantRoute,
  ShippingAddressRoutes,
];

allRouters.forEach((route) => router.use(route));

export const BaseRouter = router;
