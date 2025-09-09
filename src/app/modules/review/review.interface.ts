export type IReview = {
  rating: number;
  comment?: string;
  userId: string;
  productId: string;
  createdAt?: Date;
};
