import bcrypt from "bcrypt";
const saltRound = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRound);
}

export async function comparePassword(
  inputPassword: string,
  userPassword: string
) {
  return await bcrypt.compare(inputPassword, userPassword);
}
