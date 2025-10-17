import { Router } from "express";
import { paymentController } from "./payment.controller";
//import { auth } from "../../middlewares/auth.middleware";

const router = Router();


 //router.use(auth());

router.get("/payments", paymentController.getPayment);

router.post("/payments", paymentController.createPayment);

router.delete("/payments/:paymentId", paymentController.deletepayment);

export const  paymentRoute=router