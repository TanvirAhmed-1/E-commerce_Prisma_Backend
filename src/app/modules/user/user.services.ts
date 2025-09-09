import prisma from "../../utils/prisma";
import { IUser } from "./user.interface";

const createUserDB = async (payload: IUser) => {
  const result = await prisma.user.create({
    data: payload,
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
export const UserServices = {
  createUserDB,
  fetchUserDB,
  updateUserDB,
  deleteUserDB,
};
