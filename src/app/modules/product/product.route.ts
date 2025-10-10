import { Router } from "express";
import { productController } from "./product.controller";

const route = Router();

route.post("/products", productController.createProduct);

route.get("/products", productController.fetchProduct);

route.get("/products/:id", productController.fetchProduct);

route.put("/products", productController.updateProduct);

route.delete("/products", productController.deleteProduct);

export const productRoute = route;
