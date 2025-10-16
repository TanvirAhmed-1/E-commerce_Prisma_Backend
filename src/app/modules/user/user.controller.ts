import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import httpStatus from "http-status";
import { loginSchema } from "./user.validation";


const createdUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserDB(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: 201,
    message: "user created successfully",
    result,
  });
});

const fetchUser = catchAsync(async (req, res) => {
  console.log("Token received:", req.headers.authorization);

  const result = await UserServices.fetchUserDB();
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: " user fetch successfully",
    result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.updateUserDB(req.body, userId);
  res.status(httpStatus.OK).json({
    success: true,
    message: "User updated successfully",
    result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.deleteUserDB(userId);
  res.status(httpStatus.OK).json({
    success: true,
    message: "User Delete successfully",
    result,
  });
});

// login section

const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;

  // Validate input
  const loginValidation = loginSchema.parse(payload);

  // Login service
  const result = await UserServices.loginDB(loginValidation);

  // ✅ Set refreshToken in cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,      // dev এ false, prod এ true
    sameSite: "lax",    // dev এ lax, prod এ none
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // ✅ Send response with token
  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in successfully",
    result,
  });
});

export const UserController = {
  createdUser,
  fetchUser,
  updateUser,
  deleteUser,
  loginUser,
};
