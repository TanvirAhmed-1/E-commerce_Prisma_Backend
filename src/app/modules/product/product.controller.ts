import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.services";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductDB(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Product Create successfull",
    result,
  });
});

const fetchProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.fetchProductDB();
  res.status(httpStatus.OK).json({
    success: true,
    message: "Product fetch successfull",
    result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.updateProductDB(req.body, productId);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Product Update successfull",
    result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProductDB(productId);
  res.status(httpStatus.OK).json({
    success: true,
    message: `Product Delete this Product ${productId} successfull`,
  });
});
export const productController = {
  createProduct,
  fetchProduct,
  updateProduct,
  deleteProduct,
};
