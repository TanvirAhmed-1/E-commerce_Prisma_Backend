import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";
import { IUser, loginType } from "./user.interface";

const createUserDB = async (payload: IUser) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10); // salt rounds = 10
  const result = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
  });
  return result;
};

const fetchUserDB = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const updateUserDB = async (payload: Partial<IUser>, userId: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error(`User with id ${userId} not found`);
  }

  const result = await prisma.user.update({
    where: { id: userId },
    data: payload,
  });
  return result;
};

const deleteUserDB = async (userId: string) => {
  const result = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return result;
};

const loginDB = async (payload: loginType) => {
  // find user
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // check password
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // prepare jwt payload
  const jwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  // sign token
  const accesstoken = jwt.sign(
    jwtPayload,
    process.env.TOKEN_SECRET_KEY as string,
    {
      expiresIn: "1m",
    }
  );

  const refreshToken = jwt.sign(
    jwtPayload,
    process.env.REFRESHTOKEN_SECRET_KEY as string,
    {
      expiresIn: "7d",
    }
  );

  // return data
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    token: accesstoken,
    refreshToken,
  };
};

export const UserServices = {
  createUserDB,
  fetchUserDB,
  updateUserDB,
  deleteUserDB,
  loginDB,
};
