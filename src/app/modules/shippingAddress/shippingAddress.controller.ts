import { Request, Response } from "express";
import { ShippingAddressService } from "./shippingAddress.services";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import {
  CreateShippingAddressValidator,
  UpdateShippingAddressValidator,
} from "./shippingAddress.validation";

// Create new address
const createAddress = catchAsync(async (req, res) => {
  const data = req.body;
  const userId = req.user!.id;
  const paylode = {
    ...data,
    userId,
  };
  const validatedData = CreateShippingAddressValidator(paylode);
  const address = await ShippingAddressService.createDB(validatedData);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Shipping address created successfully",
    data: address,
  });
});

// Get user addresses
const getUserAddresses = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  //const userId = req.params.userId;
  const addresses = await ShippingAddressService.getByUserDB(userId);

  res.status(httpStatus.OK).json({
    success: true,
    data: addresses,
  });
});

// Update address
const updateAddress = catchAsync(async (req, res) => {
  const validatedData = UpdateShippingAddressValidator(req.body);
  const id = req.params.id;
  const updated = await ShippingAddressService.updateDB(id, validatedData);

  res.status(200).json({ success: true, data: updated });
});

// Delete address
const deleteAddress = catchAsync(async (req, res) => {
  const id = req.params.id;
  const deleted = await ShippingAddressService.deleteDB(id);

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
