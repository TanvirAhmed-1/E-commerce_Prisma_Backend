export type PaymentType = {
  id: string;
  productId: string;
  userId: string;
  type: string;
  amount: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};
