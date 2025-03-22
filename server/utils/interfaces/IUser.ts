export interface IUser {
  id: number;
  username: string;
  password: string;
  birthDate: Date;
  role: string; // user role, can be 'admin' or 'user'
  repeat_password?: string;
}
