import { z } from "zod";
import { NotificationType } from "@prisma/client";

export const NotificationValidation = {
  create: z.object({
    title: z.string().min(1, "Title is required"),
    message: z.string().min(1, "Message is required"),
    type: z.nativeEnum(NotificationType),
    relatedId: z.string().optional().nullable(),
  }),

  update: z.object({
    title: z.string().optional(),
    message: z.string().optional(),
    isRead: z.boolean().optional(),
  }),
};