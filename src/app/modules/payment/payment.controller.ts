import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.services";
import { PaymentValidation } from "./payment.validation";

const createPayment = catchAsync(async (req, res) => {
  const userId=req.user!.id

  const data=req.body

  const paylode={
    ...data,
    userId
  }
  const validedPayment=PaymentValidation.parse( paylode)
  const result = await PaymentServices.createPaymentDB(validedPayment);

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: "Payment  created successfully",
    result,
  });
});

const getPayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.fetchPaymentDB();

  res.status(httpStatus.OK).json({
    statusCode: 200,
    success: true,
    message: "All Payment Fetching Successfully",
    result,
  });
});

const deletepayment = catchAsync(async (req, res) => {
  const { paymentId } = req.params;
  const result = await PaymentServices.deletePaymentDB(paymentId);

  res.status(httpStatus.OK).json({
    statusCode: 200,
    success: true,
    message: " Payment Delete Successfully",
    result,
  });
});

export const paymentController = {
  deletepayment,
  createPayment,
  getPayment,
};
