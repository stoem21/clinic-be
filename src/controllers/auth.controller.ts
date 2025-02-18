import { Request, Response } from "express";
import dataSource from "../dbConfig/dataSource";
import { UserEntity } from "../entity/users.entity";
import { encrypt } from "../utils/helpers";
import * as dotenv from "dotenv";
dotenv.config();

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(500).json({ message: "email and password required" });
      }

      const userRepository = dataSource.getRepository(UserEntity);
      const user = await userRepository.findOne({
        where: { username, active: true },
      });

      const isPasswordValid =
        user && encrypt.comparepassword(user.password, password);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!isPasswordValid) {
        return res.status(404).json({ message: "Wrong password" });
      }
      const token = encrypt.generateToken({
        role: user.role,
        username,
        id: user.id,
      });

      return res.status(200).json({
        message: "Login successful",
        user: {
          username: user.username,
          role: user.role,
          isChangedPassword: user.isChangedPassword,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    const decodedToken = req["currentUser"] as UserEntity;
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = dataSource.getRepository(UserEntity);
    const user = await userRepository.findOne({
      where: { username: decodedToken.username },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const { password, ...userData } = user;
    return res.status(200).json({ ...userData });
  }
}
