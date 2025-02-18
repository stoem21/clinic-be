import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1723841756411 implements MigrationInterface {
    name = 'InitDatabase1723841756411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "core"."user_entity_role_enum" AS ENUM('SUPER_ADMIN', 'ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "core"."user_entity" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "isChangedPassword" boolean NOT NULL DEFAULT false, "role" "core"."user_entity_role_enum" NOT NULL DEFAULT 'USER', "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."treatment_type_entity" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "key" character varying(200) NOT NULL, "label" character varying(200) NOT NULL, "template" jsonb NOT NULL, CONSTRAINT "PK_83d4b4c4e9dba83041b23b2b1b6" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "core"."dentist_entity" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "phoneNumber" character varying(20), "email" character varying(100), "lineId" character varying(100), "note" text, "active" boolean NOT NULL DEFAULT true, "isOrthoDentist" boolean NOT NULL DEFAULT false, "dentistLicensId" character varying(20) NOT NULL, CONSTRAINT "UQ_7ca83441f6f17a77df7a3b05cac" UNIQUE ("dentistLicensId"), CONSTRAINT "PK_596e68ede7d8a9e8625899d8b84" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "core"."client_profile_entity_gender_enum" AS ENUM('MALE', 'FEMALE', 'NOT_SPECIFIED')`);
        await queryRunner.query(`CREATE TABLE "core"."client_profile_entity" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "hn" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, "nationalId" character varying(100), "phoneNumber" character varying(20) NOT NULL, "gender" "core"."client_profile_entity_gender_enum" NOT NULL, "birthday" TIMESTAMP WITH TIME ZONE, "orthoDentistId" character varying, "address" jsonb, "medicalCondition" character varying(500), "drugAllergy" character varying(500), "drugEat" character varying(500), "updatedBy" character varying(200), "createdBy" character varying(200), "ortho_dentist_id" integer, "updated_by" uuid, "created_by" uuid, CONSTRAINT "PK_455b68a8d83c38070fecfaff7b4" PRIMARY KEY ("hn"))`);
        await queryRunner.query(`CREATE TABLE "core"."treatment_record_entity" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientHN" character varying(200) NOT NULL, "dentistId" character varying(200) NOT NULL, "treatmentDate" TIMESTAMP WITH TIME ZONE, "note" text NOT NULL, "updatedBy" character varying(200), "createdBy" character varying(200), "updated_by" uuid, "created_by" uuid, "client_hn" character varying(100), "dentist_id" integer, CONSTRAINT "PK_8b83f1e09a8aea7a8c523606228" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."treatment_record_item_entity" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "treatmentKey" character varying(200) NOT NULL, "treatmentRecordId" character varying(200) NOT NULL, "treatmentValue" jsonb NOT NULL, "treatment_key" character varying(200), "treatment_record_id" uuid, CONSTRAINT "PK_2a827352d1e174e5a5056c2b534" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD CONSTRAINT "FK_ec59a06dfe839def4709562ca85" FOREIGN KEY ("ortho_dentist_id") REFERENCES "core"."dentist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD CONSTRAINT "FK_8d9cb644e626fede748d36db971" FOREIGN KEY ("updated_by") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD CONSTRAINT "FK_f499465068acdb43613de837deb" FOREIGN KEY ("created_by") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_426c2be82cbbfa930097588d01b" FOREIGN KEY ("updated_by") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_d14f4bb8a9e5d20c184993932af" FOREIGN KEY ("created_by") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_abfc7336d338e1bc229de4024f6" FOREIGN KEY ("client_hn") REFERENCES "core"."client_profile_entity"("hn") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_ff1e29dd20b26021b200e604cd3" FOREIGN KEY ("dentist_id") REFERENCES "core"."dentist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD CONSTRAINT "FK_1c29367e0887ef06bf9be3d262f" FOREIGN KEY ("treatment_key") REFERENCES "core"."treatment_type_entity"("key") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD CONSTRAINT "FK_5d1e445b7642514fb500727c711" FOREIGN KEY ("treatment_record_id") REFERENCES "core"."treatment_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP CONSTRAINT "FK_5d1e445b7642514fb500727c711"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP CONSTRAINT "FK_1c29367e0887ef06bf9be3d262f"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_ff1e29dd20b26021b200e604cd3"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_abfc7336d338e1bc229de4024f6"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_d14f4bb8a9e5d20c184993932af"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_426c2be82cbbfa930097588d01b"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP CONSTRAINT "FK_f499465068acdb43613de837deb"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP CONSTRAINT "FK_8d9cb644e626fede748d36db971"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP CONSTRAINT "FK_ec59a06dfe839def4709562ca85"`);
        await queryRunner.query(`DROP TABLE "core"."treatment_record_item_entity"`);
        await queryRunner.query(`DROP TABLE "core"."treatment_record_entity"`);
        await queryRunner.query(`DROP TABLE "core"."client_profile_entity"`);
        await queryRunner.query(`DROP TYPE "core"."client_profile_entity_gender_enum"`);
        await queryRunner.query(`DROP TABLE "core"."dentist_entity"`);
        await queryRunner.query(`DROP TABLE "core"."treatment_type_entity"`);
        await queryRunner.query(`DROP TABLE "core"."user_entity"`);
        await queryRunner.query(`DROP TYPE "core"."user_entity_role_enum"`);
    }

}
