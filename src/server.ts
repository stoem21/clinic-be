import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { userRouter } from "./routes/user.routes";
import { errorHandler } from "./middleware/error.middleware";
import { dentistRouter } from "./routes/dentist.routes";
import { clientProfileRouter } from "./routes/client-profile.routes";
import { treatmentRecordRouter } from "./routes/treatment-record.routes";
import { masterDataRouter } from "./routes/master-data.routes";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(errorHandler)
    .use("/api", userRouter)
    .use("/api", dentistRouter)
    .use("/api", clientProfileRouter)
    .use("/api", treatmentRecordRouter)
    .use("/api/master-data", masterDataRouter)
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
