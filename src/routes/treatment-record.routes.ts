import * as express from "express";
import { authentification } from "../middleware/authentification.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { Role } from "../entity/users.entity";
import { validateData } from "../middleware/validate-body.middleware";
import { TreatmentRecordController } from "../controllers/treatment-record.controller";
import {
  CreateTreatmentSchema,
  UpdateTreatmentSchema,
} from "../dto/treatment.dto";
const Router = express.Router();

Router.post(
  "/treatment-record",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  validateData(CreateTreatmentSchema),
  TreatmentRecordController.createTreatmentRecord
);
Router.get(
  "/treatment-record",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  TreatmentRecordController.getTreatmentRecords
);
Router.get(
  "/treatment-record/:id",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  TreatmentRecordController.getTreatmentRecord
);
Router.put(
  "/treatment-record/:id",
  authentification,
  authorization([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),
  validateData(UpdateTreatmentSchema),
  TreatmentRecordController.updateTreatmentRecord
);

export { Router as treatmentRecordRouter };
