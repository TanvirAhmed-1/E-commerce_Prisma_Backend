import express from "express";
import { shippingAddressController } from "./shippingAddress.controller";

const router = express.Router();

// Create new address
router.post("/shipping-Address", shippingAddressController.createAddress);

// Get all addresses of a user
router.get(
  "/shipping-Address/:userId",
  shippingAddressController.getUserAddresses
);

// Update address
router.put("/shipping-Address/:id", shippingAddressController.updateAddress);

// Delete address
router.delete("/shipping-Address/:id", shippingAddressController.deleteAddress);

export const ShippingAddressRoutes = router;
 