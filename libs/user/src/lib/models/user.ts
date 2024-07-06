export class User {
  id?: string;
  name?: string;
  password?: string;
  email!: string;
  role!: string;
  isBloked?: boolean;
  refreshToken?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  token!: string;
  rememberMe!: boolean;
  otp!: string;
}
