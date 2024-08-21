import bcrypt from 'bcrypt';

export async function saltAndHashPassword(password: string) {
  const saltRounds = 10; // Number of salt rounds for hashing
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
