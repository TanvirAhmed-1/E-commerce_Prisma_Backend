

export type couponType = {
  id?: string;
  userId: string
  code: string;
  discount: number;
  validFrom: Date;
  validTo: Date;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
