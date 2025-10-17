import catchAsync from "../../utils/catchAsync";
import { categoryServices } from "./category.services";
import httpStatus from "http-status";
import { createCategorySchema } from "./category.validation";

const createCategory = catchAsync(async (req, res) => {
  const categoryValidation = createCategorySchema.parse(req.body);
  const result = await categoryServices.createCategiryDb(categoryValidation);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: "Category created successfully",
    result,
  });
});

const fetchCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.fetchCategiryDb();
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Categories fetched successfully",
    result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await categoryServices.updateCategiryDb(req.body, categoryId);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Category updated successfully",
    result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await categoryServices.deleteCategiryDb(categoryId);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Category deleted successfully",
    result,
  });
});

export const categoryController = {
  createCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
};
