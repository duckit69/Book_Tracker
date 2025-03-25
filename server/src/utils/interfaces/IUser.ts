export interface IUser {
  id: number;
  username: string;
  password: string;
  birthDate: Date;
  repeat_password?: string;
}
