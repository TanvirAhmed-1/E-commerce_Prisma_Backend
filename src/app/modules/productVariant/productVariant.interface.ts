export type ProductVariantType = {
  id?: string;
  productId: string;
  color?: string | null;
  size?: string | null;
  stock: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};