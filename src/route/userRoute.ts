import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/schemasMiddleware";
import { signupSchema } from "../schemas/signUpSchemas";
import * as userControllers from "../controllers/userControllers";
import { signInSchema } from "../schemas/signInSchemas";

const userRoute = Router();

userRoute.post(
  "/sign-up",
  validateSchemaMiddleware(signupSchema),
  userControllers.create
);

userRoute.post(
  "/sign-in",
  validateSchemaMiddleware(signInSchema),
  userControllers.signIn
);

export default userRoute;
