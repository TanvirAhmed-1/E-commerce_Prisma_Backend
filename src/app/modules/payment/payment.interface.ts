import { PaymentStatus, PaymentType } from "@prisma/client";


export type paymentType = {
  id?: string;
  productId: string;
  userId: string;
  type: PaymentType;
  amount: number;
  paymentStatus: PaymentStatus;
  createdAt?: Date;
  updatedAt?: Date;
};
