import prisma from "../database/prisma";
import newUser from "../interfaces/signUpInter";
import { Users } from "@prisma/client";

export async function create(data: newUser) {
  return await prisma.users.create({ data });
}

export async function findByName(name: string): Promise<Users> {
  return await prisma.users.findFirst({ where: { name } });
}

export async function findByEmail(email: string): Promise<Users> {
  return await prisma.users.findFirst({ where: { email } });
}
