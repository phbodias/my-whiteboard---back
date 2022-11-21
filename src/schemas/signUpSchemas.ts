import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  repeatPassword: joi.ref("password"),
});
