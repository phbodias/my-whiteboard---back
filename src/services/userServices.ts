import * as userRepository from "../repositories/userRepositories";
import signInUser from "../interfaces/signInInter";
import newUser from "../interfaces/signUpInter";
import { createToken } from "../utils/createToken";
import { comparePasswords, encryptPassword } from "../utils/encrypt";
import { Users } from "@prisma/client";

export async function create(user: newUser) {
  const emailIsAvailable: boolean = await checkEmailIsAvailable(user.email);

  if (emailIsAvailable) {
    user.password = await encryptPassword(user.password); 

    return await userRepository.create(user);
  }

  throw { code: "Conflict", message: "Email already in use" };
}

export async function signIn(user: signInUser): Promise<string> {
  const userInDb: Users = await findByEmail(user.email);
  await passwordsMatch(user.password, userInDb.password);

  const token = await createToken(userInDb.id);

  return token;
}

async function checkEmailIsAvailable(email: string): Promise<boolean> {
  const isAvailable: boolean = !(await userRepository.findByEmail(email));
  return isAvailable;
}

async function checkNameIsAvailable(name: string): Promise<boolean> {
  const isAvailable: boolean = !(await userRepository.findByName(name));
  return isAvailable;
}

async function findByEmail(email: string): Promise<Users> {
  const user = await userRepository.findByEmail(email);

  if (user) return user;

  throw { code: "Not found", message: "You haven't an account yet" };
}

async function passwordsMatch(password: string, encripPassword: string) {
  const match: boolean = await comparePasswords(password, encripPassword);
  if (match) return;

  throw { code: "Unauthorized", message: "Email or password incorrect!" };
}
