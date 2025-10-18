import prisma from "../../utils/prisma";
import { Prisma } from "@prisma/client";

const createNotificationDB = async (
  payload: Prisma.NotificationCreateInput
) => {
  return await prisma.notification.create({ 
    data: payload,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    }
  });
};

const getAllNotificationsDB = async (userId: string) => {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const getUnreadCountDB = async (userId: string) => {
  return await prisma.notification.count({
    where: { userId, isRead: false },
  });
};

const markAsReadDB = async (id: string, userId: string) => {
  return await prisma.notification.updateMany({
    where: { id, userId },
    data: { isRead: true },
  });
};

const markAllAsReadDB = async (userId: string) => {
  return await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
};

const deleteNotificationDB = async (id: string, userId: string) => {
  return await prisma.notification.deleteMany({
    where: { id, userId },
  });
};

const deleteAllNotificationsDB = async (userId: string) => {
  return await prisma.notification.deleteMany({
    where: { userId },
  });
};

export const NotificationService = {
  createNotificationDB,
  getAllNotificationsDB,
  getUnreadCountDB,
  markAsReadDB,
  markAllAsReadDB,
  deleteNotificationDB,
  deleteAllNotificationsDB,
};
