import * as express from "express";
import { authentification } from "../middleware/authentification.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { Role } from "../entity/users.entity";
import { MasterDataController } from "../controllers/master-data.controller";
const Router = express.Router();

Router.get(
  "/address",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  MasterDataController.getAddress
);

export { Router as masterDataRouter };
