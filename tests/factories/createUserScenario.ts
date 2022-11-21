import supertest from "supertest";
import app from "../../src/app";
import { signUpFactory } from "./userFactories";

export default async function createUserScenario() {
  const user = await signUpFactory();
  const data = { email: user.email, password: user.password };
  await supertest(app).post("/sign-up").send(user);
  return data;
}
