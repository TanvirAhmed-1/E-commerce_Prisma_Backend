import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.get("/payments", paymentController.getPayment);

router.post("/payments", paymentController.createPayment);

router.delete("/payments/:paymentId", paymentController.deletepayment);

export const  paymentRoute=router