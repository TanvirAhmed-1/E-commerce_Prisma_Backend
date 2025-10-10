import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.services";
import { Request, Response } from "express";

// 🟢 Unified GET controller for all /products and /products/:id
const fetchProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const name = getQueryString(req.query.name);
  const category = getQueryString(req.query.category);
  const productid = getQueryString(req.query.id);

  let result;
  let message;

  if (id) {
    // ✅ Case 1: Fetch by ID
    result = await ProductServices.fetchSingleProductDB(id);
    message = `Product fetched by ID successfully`;
  } else if (name || category || productid) {
    // ✅ Case 2: Search by name/category
    result = await ProductServices.searchProductsDB({
      name,
      category,
      productid,
    });
    message = "Product search successful";
  } else {
    // ✅ Case 3: Fetch all
    result = await ProductServices.fetchProductDB();
    message = "All products fetched successfully";
  }

  res.status(httpStatus.OK).json({
    success: true,
    message,
    result,
  });
});

// 🧩 Helper: safely get query string value
const getQueryString = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return undefined;
};

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProductDB(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Product created successfully",
    result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.updateProductDB(req.body, productId);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Product updated successfully",
    result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  await ProductServices.deleteProductDB(productId);
  res.status(httpStatus.OK).json({
    success: true,
    message: `Product ${productId} deleted successfully`,
  });
});

export const productController = {
  createProduct,
  fetchProduct,
  updateProduct,
  deleteProduct,
};
