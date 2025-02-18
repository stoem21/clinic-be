import * as express from "express";
import { authentification } from "../middleware/authentification.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { Role } from "../entity/users.entity";
import { DentistController } from "../controllers/dentist.controller";
import { validateData } from "../middleware/validate-body.middleware";
import { DentistCreateSchema } from "../dto/dentist.dto";
const Router = express.Router();

Router.post(
  "/dentist",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN]),
  validateData(DentistCreateSchema),
  DentistController.createDentist
);
Router.get(
  "/dentist",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN]),
  DentistController.getDentists
);
Router.get(
  "/dentist/:id",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN]),
  DentistController.getDentist
);
Router.put(
  "/dentist/:id",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN]),
  validateData(DentistCreateSchema),
  DentistController.updateDentist
);
Router.delete(
  "/dentist/:id",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN]),
  DentistController.deleteDentist
);
Router.get(
  "/dentist/activate/:id",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN]),
  DentistController.activateDentist
);
export { Router as dentistRouter };
