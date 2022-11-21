import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      throw { code: "IncompatibleFormat", message: [`Revise os campos: ${validation.error.message}`] };
    }

    next();
  };
}