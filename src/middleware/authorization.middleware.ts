import { NextFunction, Request, Response } from "express";
import dataSource from "../dbConfig/dataSource";
import { UserEntity } from "../entity/users.entity";

export const authorization = (roles: string[]) => {
  console.log("-----------authorization-----------");
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = dataSource.getRepository(UserEntity);
    const user = await userRepo.findOne({
      where: { username: req["currentUser"].username },
    });
    console.log(user);
    console.log(!roles.includes(user?.role || ""));
    if (user && !roles.includes(user.role)) {
      console.log("????");
      return res.status(403).json({ message: "this role cant do" });
    }
    next();
  };
};
