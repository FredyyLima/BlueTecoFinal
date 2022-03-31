export type LoginInputDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  token: string;
  user: User;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};
