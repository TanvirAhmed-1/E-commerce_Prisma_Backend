import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router.post("/orders", orderController.createOrder);

router.get("/orders", orderController.fetchOrder);

router.delete("/orders/:orderId", orderController.deleteOrder);

export const orderRoute = router;
