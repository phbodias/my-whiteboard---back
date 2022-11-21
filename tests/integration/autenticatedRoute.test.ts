import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/prisma";
import createUserScenario from "../factories/createUserScenario";

describe("Testes para simular tentativa de acesso à uma rota autenticada", () => {
  it("Acessa rota autenticada ao enviar token valido e recebe status 200", async () => {
    const user = await createUserScenario();
    const login = await supertest(app).post("/sign-in").send(user);
    const token = login.body.token;
    const result = await supertest(app)
      .get("/authenticated")
      .send()
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toBe(200);
  });

  it("Tenta acessar rota autenticada sem enviar token e recebe status code 401", async () => {
    const result = await supertest(app).get("/authenticated");
    expect(result.status).toBe(401);
  });

  it("Tenta acessar rota autenticada com token invalido e recebe status 401", async () => {
    const user = await createUserScenario();
    const login = await supertest(app).post("/sign-in").send(user);
    const token = login.body.token;
    const result = await supertest(app)
      .get("/authenticated")
      .set({ Authorization: `Bearer ${token}invalid` });
    expect(result.status).toBe(401);
  });
});
