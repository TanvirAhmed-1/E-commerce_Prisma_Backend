import { NotificationType } from "@prisma/client";

export interface INotification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead?: boolean;
  relatedId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}