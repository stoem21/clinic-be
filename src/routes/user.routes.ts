import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { authentification } from "../middleware/authentification.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { UserController } from "../controllers/user.controller";
import { Role } from "../entity/users.entity";
import { validateData } from "../middleware/validate-body.middleware";
import {
  userCreateSchema,
  userUpdatePasswordSchema,
  userUpdateSchema,
} from "../dto/user.dto";
const Router = express.Router();

Router.get(
  "/user",
  authentification,
  authorization([Role.ADMIN, Role.SUPER_ADMIN]),
  UserController.getUsers
);
Router.get(
  "/user/:username",
  authentification,
  authorization([Role.ADMIN, Role.SUPER_ADMIN]),
  UserController.getUser
);
Router.get(
  "/profile",
  authentification,
  authorization([Role.USER, Role.ADMIN, Role.SUPER_ADMIN]),
  AuthController.getProfile
);

Router.post("/login", AuthController.login);
Router.post(
  "/user",
  authentification,
  authorization([Role.SUPER_ADMIN]),
  validateData(userCreateSchema),
  UserController.createUser
);
Router.patch(
  "/user/:username",
  authentification,
  authorization([Role.SUPER_ADMIN]),
  validateData(userUpdateSchema),
  UserController.updateUser
);
Router.patch(
  "/user/password/:username",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  validateData(userUpdatePasswordSchema),
  UserController.updatePassword
);
Router.delete(
  "/user/:username",
  authentification,
  authorization([Role.SUPER_ADMIN]),
  UserController.deleteUser
);
export { Router as userRouter };
