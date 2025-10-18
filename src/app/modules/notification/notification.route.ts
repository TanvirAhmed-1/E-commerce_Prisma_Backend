import express, { Router } from "express";
import { notificationController } from "./notification.controller";
import { NotificationValidation } from "./notification.validation";
import { auth } from "../../middlewares/auth.middleware";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

// Get unread count (should be before :id routes)
router.get("/notifications", notificationController.getUnreadCount);

// Mark all as read
router.patch("/notifications", notificationController.markAllAsRead);

// Delete all notifications
router.delete(
  "/notifications/delete",
  notificationController.deleteAllNotifications
);

// Create a new notification
router.post(
  "/notifications",
  auth(),
  validateRequest(NotificationValidation.create),
  notificationController.createNotification
);

// Get all notifications for the logged-in user
router.get("/notifications", auth(), notificationController.getNotifications);

// Mark a notification as read
router.patch("/notifications/:id/read", auth(), notificationController.markAsRead);

// Delete a notification
router.delete("/notifications/:id", auth(), notificationController.deleteNotification);

export const notificationRoutes = router;
