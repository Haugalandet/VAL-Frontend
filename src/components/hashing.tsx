import bcrypt from "bcryptjs";
import { saltRounds } from "../utils/consts";

export function hash(a: string): Promise<string> {
  return bcrypt.hash(a, saltRounds);
}

export function compare(a: string, b: string): Promise<boolean> {
  return bcrypt.compare(a, b);
}
