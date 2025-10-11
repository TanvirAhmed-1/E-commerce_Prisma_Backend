export type ProductVariantType = {
  id?: string;
  productId: string;
  sku: string;
  color?: string | null;
  size?: string | null;
  stock: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};