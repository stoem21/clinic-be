import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressTable1739196598491 implements MigrationInterface {
  name = "AddAddressTable1739196598491";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "core"."tambons_entity" ("id" integer NOT NULL, "name_th" character varying(100) NOT NULL, "name_en" character varying(100) NOT NULL, "amphure_id" integer NOT NULL, "zip_code" integer NOT NULL, CONSTRAINT "PK_49dd9584211be77a653430f8074" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "core"."provinces_entity" ("id" integer NOT NULL, "name_th" character varying(100) NOT NULL, "name_en" character varying(100) NOT NULL, CONSTRAINT "PK_639e43d290206b7be59d7ee4302" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "core"."amphures_entity" ("id" integer NOT NULL, "name_th" character varying(100) NOT NULL, "name_en" character varying(100) NOT NULL, "province_id" integer NOT NULL, CONSTRAINT "PK_8b1ac7321c2db2e6ef2ff52a948" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "core"."amphures_entity"`);
    await queryRunner.query(`DROP TABLE "core"."provinces_entity"`);
    await queryRunner.query(`DROP TABLE "core"."tambons_entity"`);
  }
}
