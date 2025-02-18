import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authentification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Not found header" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not found token" });
  }
  const decode = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err, user) => {
      if (err) {
        return false;
      }
      return user;
    }
  );
  if (!(decode as unknown)) {
    return res.status(401).json({ message: "Unauthorized Token" });
  }
  req["currentUser"] = decode;
  next();
};
