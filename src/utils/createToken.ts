import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export async function createToken(userId: number): Promise<string> {
  const secret: string = process.env.TOKEN_SECRET_KEY as string;
  const token: string = jwt.sign({ userId }, secret, {
    expiresIn: process.env.TOKEN_EXPIRES,
  });
  return token;
}

//TOKEN_SECRET_KEY = chave para criptografar token
//TOKEN_EXPIRES = tempo para expiração do token
