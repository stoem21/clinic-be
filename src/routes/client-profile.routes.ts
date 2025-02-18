import * as express from "express";
import { authentification } from "../middleware/authentification.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { Role } from "../entity/users.entity";
import { validateData } from "../middleware/validate-body.middleware";
import { CreateClientSchema } from "../dto/client-profile.dto";
import { ClientProfileController } from "../controllers/client-profile.controller";
const Router = express.Router();

Router.post(
  "/client-profile",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  validateData(CreateClientSchema),
  ClientProfileController.createClientProfile
);
Router.get(
  "/client-profile",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  ClientProfileController.getClients
);
Router.get(
  "/client-profile/:hn",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  ClientProfileController.getClient
);
Router.put(
  "/client-profile/:hn",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  validateData(CreateClientSchema),
  ClientProfileController.updateClientProfile
);

export { Router as clientProfileRouter };
