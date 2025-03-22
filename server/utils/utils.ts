import bcrypt from "bcrypt";
const saltRound = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRound);
}
