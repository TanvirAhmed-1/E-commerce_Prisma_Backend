// src/middlewares/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { Prisma } from "@prisma/client";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // console এ দেখাবে debugging জন্য

  // Prisma unique constraint error
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    return res.status(httpStatus.CONFLICT).json({
      success: false,
      statusCode: 409,
      message: "Email already exists",
    });
  }

  // Zod validation error
  if (err?.name === "ZodError") {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      statusCode: 400,
      message: err.errors.map((e: any) => e.message).join(", "),
    });
  }

  // Generic error
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong",
  });
};

export default globalErrorHandler;
