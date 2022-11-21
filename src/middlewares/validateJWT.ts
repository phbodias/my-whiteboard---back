import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export async function validateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  const SECRET: string = process.env.TOKEN_SECRET_KEY as string;

  jwt.verify(token, SECRET, (err: any, decoded: any) => {
    if (err) throw { code: "Unauthorized", message: "Token inválido" };

    res.locals.userId = Number(decoded.id);

    next();
  });
}