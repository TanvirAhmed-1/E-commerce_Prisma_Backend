import prisma from "../../utils/prisma";
import { ICategory } from "./category.interface";

const createCategiryDb = async (payload: ICategory) => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const fetchCategiryDb = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const updateCategiryDb = async (
  payload: Partial<ICategory>,
  categoryId: string
) => {
  const result = await prisma.category.update({
    data: payload,
    where: { id: categoryId },
  });
  return result;
};

const DeleteCategiryDb = async (categoryId: string) => {
  const result = await prisma.category.delete({
    where: { id: categoryId },
  });
  return result;
};
export const categoryServices = {
  fetchCategiryDb,
  createCategiryDb,
  updateCategiryDb,
  DeleteCategiryDb,
};
