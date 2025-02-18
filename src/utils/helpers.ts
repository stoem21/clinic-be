import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { TokenPayload } from "../dto/user.dto";

dotenv.config();
export const DEFAULT_PAGE_SIZE = 20;
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    console.log(bcrypt.compareSync(password, hashPassword));
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: TokenPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET || "SECRET2", {
      expiresIn: "1d",
    });
  }

  // this phase not have
  // static generateRefreshToken(payload: TokenPayload) {
  //   return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || "SECRET1", {
  //     expiresIn: "1d",
  //   });
  // }
}

export const getddmmyyyy = () => {
  const today = new Date();
  const yyyy = today.getFullYear() + 543;
  const mm = today.getMonth() + 1;
  const dd = today.getDate();
  return `${dd < 10 ? `0${dd}` : dd}${
    mm < 10 ? `0${mm}` : mm
  }${yyyy.toString()}`;
};
