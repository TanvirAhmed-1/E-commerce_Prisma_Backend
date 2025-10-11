import httpStatus, { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import { orderServices } from "./order.services";
import { success } from "zod";

const createOrder = catchAsync(async (req, res) => {
  const result = await orderServices.createOrderDB(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: "Order Create Successfully",
    result,
  });
});

const fetchOrder = catchAsync(async (req, res) => {
  const result = await orderServices.getOrderDB();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Order fetching  Successfully",
    result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const result = await orderServices.deleteOrderDB(orderId);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Order Delete  Successfully",
    result,
  });
});

export const orderController = {
  deleteOrder,
  createOrder,
  fetchOrder,
};
