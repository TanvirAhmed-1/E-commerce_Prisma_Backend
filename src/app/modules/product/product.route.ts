import { Router } from "express";
import { productController } from "./product.controller";
import { auth } from "../../middlewares/auth.middleware";

const route = Router();

route.use(auth());

route.post("/products", productController.createProduct);

route.get("/products", productController.fetchProduct);

route.get("/products/:productId", productController.getSingleProduct);

route.put("/products/:productId", productController.updateProduct);

route.delete("/products/:productId", productController.deleteProduct);

export const productRoute = route;
