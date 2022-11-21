import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/prisma";
import createUserScenario from "../factories/createUserScenario";
import { signUpFactory } from "../factories/userFactories";


describe("Testes para rota /sign-in", () => {
  it("Faz o login e recebe status 200 e o token de acesso", async () => {
    const user = await createUserScenario();
    const result = await supertest(app).post("/sign-in").send(user);
    expect(result.status).toBe(200);
    expect(result.body.token.length).toBeGreaterThan(0);
  });

  it("Login com senha incorreta e recebe status code 401", async () => {
    const user = await createUserScenario();
    user.password = `${user.password}wrong`;
    const result = await supertest(app).post("/sign-in").send(user);
    expect(result.status).toBe(401);
  });

  it("Login com usuário ainda não cadastrado e recebe status code 404", async () => {
    const body = await signUpFactory();
    const user = { email: body.email, password: body.password };
    const result = await supertest(app).post("/sign-in").send(user);
    expect(result.status).toBe(404);
  });
});
