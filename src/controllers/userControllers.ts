import { Response, Request } from "express";
import newUser from "../interfaces/signUpInter";
import * as userServices from "../services/userServices";
import signInUser from "../interfaces/signInInter";

export async function create(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const user: newUser = { name, email, password };
  await userServices.create(user);
  return res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const user: signInUser = req.body;
  const token = await userServices.signIn(user);
  return res.status(200).send({token});
}
