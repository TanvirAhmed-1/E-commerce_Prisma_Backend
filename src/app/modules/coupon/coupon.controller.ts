import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { couponservices } from "./coupon.services";

const createCoupon = catchAsync(async (req, res) => {
  const result = await couponservices.createCouponBD(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: "Coupon Create Succesfully",
    result,
  });
});

const getCoupon = catchAsync(async (req, res) => {
  const result = await couponservices.getCouponBD();

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: " All Coupon Create Succesfully",
    result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const { couponId } = req.params;
  const result = await couponservices.deleteCouponDB(couponId);

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: " Coupon Delete Succesfully",
    result
  });
});

export const couponContrller = {
  createCoupon,
  deleteCoupon,
  getCoupon,
};
