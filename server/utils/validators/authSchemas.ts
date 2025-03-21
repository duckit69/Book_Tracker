const Joi = require("joi");

const userSignupSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  repeat_password: Joi.ref("password"),
});
