import Joi from "joi";
import { IUser } from "../interfaces/IUser.js";

export const userSignupSchema = Joi.object<IUser>({
  username: Joi.string().alphanum().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  repeat_password: Joi.ref("password"),
  birthDate: Joi.date().max("now").greater("1950-01-01").required(),
});

export const userLoginSchema = Joi.object<IUser>({
  username: Joi.string().alphanum().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});
