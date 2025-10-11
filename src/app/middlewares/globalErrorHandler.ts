import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(" Global Error:", err);

  let statusCode = 500;
  let message = "Something went wrong";

  // Prisma unique constraint error
if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
  statusCode = httpStatus.CONFLICT;
  // Type assertion: target কে string[] ধরছি
  const targetFields = err.meta?.target as string[] | undefined;
  message = targetFields
    ? `Duplicate field value: ${targetFields.join(", ")}`
    : "Duplicate field value detected";
}

  // Zod validation error
  else if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = err.issues.map((issue) => issue.message).join(", ");
  }

  // Other JS errors
  else if (err instanceof Error) {
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
