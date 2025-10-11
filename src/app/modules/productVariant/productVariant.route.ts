import { Router } from "express";
import { productVariantController } from "./productVariant.controller";

const router = Router();

router.post("/variants", productVariantController.createProductVariant);

router.get("/variants", productVariantController.getProductVariants);

router.put(
  "/variants/:variantId",
  productVariantController.updateProductVariant
);

router.delete(
  "/variants/:variantId",
  productVariantController.deleteProductVariant
);

export const variantRoute = router;
