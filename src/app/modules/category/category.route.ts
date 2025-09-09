import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();

// Create a category
router.post("/categorys", categoryController.createCategory);

// Get all categories
router.get("/categorys", categoryController.fetchCategory);

// Update a category by ID
router.put("/categorys/:categoryId", categoryController.updateCategory);

// Delete a category by ID
router.delete("/categorys/:categoryId", categoryController.deleteCategory);

export const categoryRoute = router;
