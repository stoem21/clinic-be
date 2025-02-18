import { Request, Response } from "express";
import { encrypt } from "../utils/helpers";
import { Role, UserEntity } from "../entity/users.entity";
import dataSource from "../dbConfig/dataSource";
import { UserCreateRequest } from "../dto/user.dto";
import { Like } from "typeorm";

export function isEnumMember<T extends Record<string, unknown>>(
  val: unknown,
  enumType: T
) {
  return Object.values(enumType).includes(val);
}

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { username, role } = req.body as UserCreateRequest;
    const encryptedPassword = await encrypt.encryptpass("0619159946");
    const isAlreadyHave = await dataSource
      .getRepository(UserEntity)
      .findOne({ where: { username, active: true } });
    if (isAlreadyHave) {
      return res.status(400).json({ message: "Already have this username" });
    }
    const user = new UserEntity();
    user.username = username;
    user.password = encryptedPassword;
    user.role = role as Role;

    const { password, ...savedUser } = await dataSource
      .getRepository(UserEntity)
      .save(user);
    const token = encrypt.generateToken({ role, username, id: savedUser.id });

    return res
      .status(200)
      .json({ message: "User created successfully", token, savedUser });
  }

  static async getUser(req: Request, res: Response) {
    const user = await dataSource.getRepository(UserEntity).findOne({
      select: ["username", "role", "isChangedPassword", "updatedAt"],
      where: { username: req.params.username, active: true },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ data: user });
  }

  static async getUsers(req: Request, res: Response) {
    const { role, username, isActive } = req.query;
    // add type of the query !!!
    const buildWhereCause = {};
    if (isActive !== undefined) {
      buildWhereCause["active"] = isActive;
    }
    if (username) {
      buildWhereCause["username"] = Like(`%${username as string}%`);
    }
    if (role) {
      buildWhereCause["role"] = role;
    }
    const users = await dataSource.getRepository(UserEntity).find({
      select: ["username", "role", "isChangedPassword", "updatedAt", "active"],
      where: buildWhereCause,
      order: { username: "ASC" },
    });
    return res.status(200).json({
      data: users.filter((user) => user.role !== Role.SUPER_ADMIN),
    });
  }

  static async updateUser(req: Request, res: Response) {
    const { username } = req.params;
    const { role, resetPassword, recoveryUser } = req.body;
    // add type of the query !!!
    const buildWhereCause = { username };
    if (!recoveryUser) {
      buildWhereCause["active"] = true;
    }
    const user = await dataSource.getRepository(UserEntity).findOne({
      where: buildWhereCause,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (resetPassword) {
      user.isChangedPassword = false;
    } else if (recoveryUser) {
      user.active = true;
    } else if (role) {
      user.role = role;
    }
    const savedUser = await dataSource.getRepository(UserEntity).save(user);
    return res.status(200).json({ message: "updated", data: savedUser });
  }

  static async updatePassword(req: Request, res: Response) {
    const { username } = req.params;
    const { password } = req.body;
    console.log("user update password");
    // add type of the query !!!
    const user = await dataSource.getRepository(UserEntity).findOne({
      where: { username, active: true },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (password && !user.isChangedPassword) {
      user.isChangedPassword = true;
      user.password = await encrypt.encryptpass(password);
    }
    const savedUser = await dataSource.getRepository(UserEntity).save(user);
    return res.status(200).json({ message: "updated", data: savedUser });
  }

  static async deleteUser(req: Request, res: Response) {
    const { username } = req.params;
    const user = await dataSource.getRepository(UserEntity).findOne({
      where: { username, active: true },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.active = false;
    await dataSource.getRepository(UserEntity).save(user);
    return res.status(200).json({ message: "deleted" });
  }
}
