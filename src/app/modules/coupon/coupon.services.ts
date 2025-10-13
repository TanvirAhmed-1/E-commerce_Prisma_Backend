import httpStatus from "http-status";
import prisma from "../../utils/prisma";
import { couponType } from "./coupon.interface";
import { CouponValidation } from "./coupon.validation";

const createCouponBD = async (sendData: couponType) => {
  //const { userId } = sendData;

  const parsed = CouponValidation.parse(sendData);
  // const existingUser = await prisma.user.findUnique({
  //   where: { id: userId },
  // });

  // if (!existingUser) {
  //   const error: any = new Error("Invalid userId: User not found");
  //   error.status = httpStatus.BAD_REQUEST;
  //   throw error;
  // }
  return await prisma.coupon.create({ data: parsed });
};

const getCouponBD = async () => {
  return await prisma.coupon.findMany({
    select: {
      id: true,
      code: true,
      discount: true,
      validFrom: true,
      validTo: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const deleteCouponDB = async (couponId: string) => {
  const findid = await prisma.coupon.findUnique({
    where: { id: couponId },
  });

  if (!findid) {
    throw new Error(`Coupon id ${findid} not Found !`);
  }

  return await prisma.coupon.delete({
    where: { id: couponId },
  });
};

export const couponservices = {
  getCouponBD,
  deleteCouponDB,
  createCouponBD,
};
