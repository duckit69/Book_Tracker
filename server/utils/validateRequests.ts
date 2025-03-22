import Joi from "joi";
import { Request, Response } from "express";

const validateSignup = (userSignupSchema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: any) => {
    // cant do try catch validate is sync and return error object ( does not throw error)
    const { error } = userSignupSchema.validate(req.body);
    if (req.body.password !== req.body.repeat_password || error) {
      res
        .status(400)
        .send({ message: "Invalid request data", error: error?.message });
    } else {
      next();
    }
  };
};

export const validateRequests = {
  validateSignup,
};
