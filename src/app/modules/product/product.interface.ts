export type TCurrency = "BDT" | "USD" | "EUR";

export interface IProduct {
  name: string;
  slug: string;
  description?: string;
  price: number;
  discountPrice?: number;
  currency?: TCurrency;
  stock?: number;
  sku: string;
  brand?: string;
  images: string[];
  thumbnail?: string;
  categoryId: string;
  rating?: number;
  reviewsCount?: number;
}
