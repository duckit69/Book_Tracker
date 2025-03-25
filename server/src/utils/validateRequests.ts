import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

const validateRequst = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: any) => {
    // cant do try catch validate is sync and return error object ( does not throw error)
    const { error } = schema.validate(req.body);
    // if repeat_password is present this is sign up
    // otherwise it is login
    if (!req.body.repeat_password) {
      if (error) {
        res.status(400).send({
          message: "Invalid request data",
          error: error?.message,
        });
      } else {
        next();
      }
    } else if (error || req.body.password !== req.body.repeat_password) {
      res.status(400).send({
        message: "Invalid request data",
        error: error?.message || "Passwords does not match",
      });
    } else {
      next();
    }
  };
};

function validateRequestParams(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    if (error) {
      res.status(400).json(error.message);
    } else {
      next();
    }
  };
}

export const validateRequests = {
  validateRequst,
  validateRequestParams,
};
