import { Router } from "express";
import { couponContrller } from "./coupon.controller";

const router = Router();

router.post("/coupons", couponContrller.createCoupon);

router.get("/coupons", couponContrller.getCoupon);

router.delete("/coupons/:couponId", couponContrller.deleteCoupon);


export const couponRouter=router