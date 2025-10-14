export type TGender = "male" | "female" | "other";

export type IUser = {
  name: string;
  email: string;
  password: string;
  address: string;
  gender: TGender;
  createdAt?: Date;
  updatedAt?: Date;
};

export type loginType = {
  email: string;
  password: string;
};
