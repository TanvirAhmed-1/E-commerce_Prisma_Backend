import { Request, Response } from "express";
import { ShippingAddressService } from "./shippingAddress.services";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import {
  CreateShippingAddressValidator,
  UpdateShippingAddressValidator,
} from "./shippingAddress.validation";

// Create new address
const createAddress = catchAsync(async (req: Request, res: Response) => {
  const validatedData = CreateShippingAddressValidator(req.body);
  const data = req.body;
  const address = await ShippingAddressService.create(validatedData);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Shipping address created successfully",
    data: address,
  });
});

// Get user addresses
const getUserAddresses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const addresses = await ShippingAddressService.getByUser(userId);

  res.status(httpStatus.OK).json({
    success: true,
    data: addresses,
  });
});

// Update address
const updateAddress = catchAsync(async (req: Request, res: Response) => {
  const validatedData = UpdateShippingAddressValidator(req.body);
  const id = req.params.id;
  const updated = await ShippingAddressService.update(id, validatedData);

  res.status(200).json({ success: true, data: updated });
});

// Delete address
const deleteAddress = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const deleted = await ShippingAddressService.delete(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Shipping address deleted",
    data: deleted,
  });
});

export const shippingAddressController = {
  deleteAddress,
  createAddress,
  getUserAddresses,
  updateAddress,
};
