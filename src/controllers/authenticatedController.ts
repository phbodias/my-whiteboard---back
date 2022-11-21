import { Request, Response } from "express";

export async function authenticatedController(req: Request, res: Response) {
  res.sendStatus(200);
}
