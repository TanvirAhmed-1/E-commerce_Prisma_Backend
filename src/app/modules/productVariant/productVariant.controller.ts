import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { productVariantServices } from "./productVariant.services";
import { ProductVariantValidation } from "./productVariant.validation";

const createProductVariant = catchAsync(async (req, res) => {
  const validate = ProductVariantValidation.parse(req.body);
  const result = await productVariantServices.createProductVariantDB(validate);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: "ProductVariant created successfully",
    result,
  });
});

//  Fetch All ProductVariants
const getProductVariants = catchAsync(async (req, res) => {
  const result = await productVariantServices.fetchProductVariantsDB();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "All ProductVariants fetched successfully",
    result,
  });
});

//  Delete ProductVariant by ID
const deleteProductVariant = catchAsync(async (req, res) => {
  const { variantId } = req.params;
  const result = await productVariantServices.deleteProductVariantDB(variantId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "ProductVariant deleted successfully",
    result,
  });
});

// Update ProductVariant by ID
const updateProductVariant = catchAsync(async (req, res) => {
  const { variantId } = req.params;
  const result = await productVariantServices.updateProductVariantDB(
    variantId,
    req.body
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "ProductVariant updated successfully",
    result,
  });
});

export const productVariantController = {
  createProductVariant,
  getProductVariants,
  deleteProductVariant,
  updateProductVariant,
};
