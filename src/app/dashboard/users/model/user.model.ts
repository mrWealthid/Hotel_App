export interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
  role: "user" | "admin";
  password?: string;
  googleId?: string;
  createdAt?: Date;
  dateOfBirth?: Date;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active?: boolean;
}
