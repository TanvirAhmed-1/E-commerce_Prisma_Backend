export interface IShippingAddress {
  id?: string;             // optional for create
  userId: string;
  phone: string;
  division: string;
  district: string;
  street: string;
  postalCode?: string;
  landmark?: string;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}



