import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { NotificationService } from "./notification.services";

const createNotification = catchAsync(async (req, res) => {
  const data = req.body;
  const userId = req.user!.id;

  const notificationData = {
    ...data,
    user: { connect: { id: userId } },
  };

  const result = await NotificationService.createNotificationDB(
    notificationData
  );

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Notification created successfully",
    data: result,
  });
});

const getNotifications = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const result = await NotificationService.getAllNotificationsDB(userId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "All notifications fetched successfully",
    data: result,
  });
});

const getUnreadCount = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const count = await NotificationService.getUnreadCountDB(userId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Unread count fetched successfully",
    data: { unreadCount: count },
  });
});

const markAsRead = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;
  
  const result = await NotificationService.markAsReadDB(id, userId);

  if (result.count === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Notification not found or access denied",
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Notification marked as read successfully",
  });
});

const markAllAsRead = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const result = await NotificationService.markAllAsReadDB(userId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "All notifications marked as read",
    data: { updatedCount: result.count },
  });
});

const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;
  
  const result = await NotificationService.deleteNotificationDB(id, userId);

  if (result.count === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Notification not found or access denied",
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Notification deleted successfully",
  });
});

const deleteAllNotifications = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const result = await NotificationService.deleteAllNotificationsDB(userId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "All notifications deleted successfully",
    data: { deletedCount: result.count },
  });
});

export const notificationController = {
  createNotification,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
};