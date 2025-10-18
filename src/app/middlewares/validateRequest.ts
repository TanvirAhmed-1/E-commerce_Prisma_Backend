// ============================================
// File: src/middlewares/validateRequest.ts
// ============================================
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import httpStatus from "http-status";

const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate the entire request object
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      }) as any;

      // Replace request objects with parsed (sanitized) data
      req.body = parsed.body || req.body;
      req.query = parsed.query || req.query;
      req.params = parsed.params || req.params;

      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        // Format validation errors in a user-friendly way
        const formattedErrors = error.issues.map((issue) => ({
          field: issue.path.join(".").replace(/^(body|query|params)\./, ""),
          message: issue.message,
        }));

        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          statusCode: httpStatus.BAD_REQUEST,
          message: "Validation failed",
          errors: formattedErrors,
        });
      }

      // Pass unexpected errors to global error handler
      next(error);
    }
  };
};

export default validateRequest;