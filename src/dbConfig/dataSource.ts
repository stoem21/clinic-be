import { join } from "path";
// import { ClientProfileEntity } from "../entity/client-profile";
// import { DentistEntity } from "../entity/dentist.entity";
// import { TreatmentRecordEntity } from "../entity/treatment-record.entity";
// import { UserEntity } from "../entity/users.entity";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig = (): PostgresConnectionOptions => ({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "password",
  database: "core",
  schema: "core",
  synchronize: false,
  logging: false,
  entities: [join(__dirname, "../entity/*.entity{.ts,.js}")],
  migrations: [join(__dirname, "../migrations/*{.ts,.js}")],
  subscribers: [],
});

export default new DataSource(pgConfig());
