
import { categoryController } from "./category.controller";
import { auth } from "../../middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

  router.use(auth())
  
// Create a category
router.post("/categorys", categoryController.createCategory);

router.get("/categorys", categoryController.fetchCategory);

router.put("/categorys/:categoryId", categoryController.updateCategory);


router.delete("/categorys/:categoryId", categoryController.deleteCategory);

export const categoryRoute = router;
