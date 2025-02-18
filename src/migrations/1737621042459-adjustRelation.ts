import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustRelation1737621042459 implements MigrationInterface {
    name = 'AdjustRelation1737621042459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP CONSTRAINT "FK_f499465068acdb43613de837deb"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP CONSTRAINT "FK_8d9cb644e626fede748d36db971"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP CONSTRAINT "FK_5d1e445b7642514fb500727c711"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP CONSTRAINT "FK_1c29367e0887ef06bf9be3d262f"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_ff1e29dd20b26021b200e604cd3"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_abfc7336d338e1bc229de4024f6"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_d14f4bb8a9e5d20c184993932af"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_426c2be82cbbfa930097588d01b"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP COLUMN "treatment_record_id"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP COLUMN "treatment_key"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "dentist_id"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "client_hn"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "nameTitle" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "firstName" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "lastName" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "updatedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "createdBy" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP COLUMN "treatmentRecordId"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD "treatmentRecordId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "dentistId"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "dentistId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "updatedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "createdBy" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD CONSTRAINT "FK_1ffcb03c7bfe6c5e6abb08c8933" FOREIGN KEY ("updatedBy") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD CONSTRAINT "FK_8553629513590f3901c266c8e9b" FOREIGN KEY ("createdBy") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD CONSTRAINT "FK_4f569570bc2bd527bd3d6134dfe" FOREIGN KEY ("treatmentKey") REFERENCES "core"."treatment_type_entity"("key") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD CONSTRAINT "FK_bfdb1875b7ae2354aeb5c3070c6" FOREIGN KEY ("treatmentRecordId") REFERENCES "core"."treatment_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_daeaa1f1702d48bbc9dc1886419" FOREIGN KEY ("updatedBy") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_95ac42d203593c4e4d26ae35668" FOREIGN KEY ("createdBy") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_0e774b535b92b2fb4801c7d2bf0" FOREIGN KEY ("clientHN") REFERENCES "core"."client_profile_entity"("hn") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_c8f90322e86acb29e5e29efb627" FOREIGN KEY ("dentistId") REFERENCES "core"."dentist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_c8f90322e86acb29e5e29efb627"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_0e774b535b92b2fb4801c7d2bf0"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_95ac42d203593c4e4d26ae35668"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_daeaa1f1702d48bbc9dc1886419"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP CONSTRAINT "FK_bfdb1875b7ae2354aeb5c3070c6"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP CONSTRAINT "FK_4f569570bc2bd527bd3d6134dfe"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP CONSTRAINT "FK_8553629513590f3901c266c8e9b"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP CONSTRAINT "FK_1ffcb03c7bfe6c5e6abb08c8933"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "createdBy" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "updatedBy" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP COLUMN "dentistId"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "dentistId" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP COLUMN "treatmentRecordId"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD "treatmentRecordId" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "createdBy" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "updatedBy" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "nameTitle"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "updated_by" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "created_by" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "client_hn" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD "dentist_id" integer`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD "treatment_key" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD "treatment_record_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "updated_by" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "created_by" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_426c2be82cbbfa930097588d01b" FOREIGN KEY ("updated_by") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_d14f4bb8a9e5d20c184993932af" FOREIGN KEY ("created_by") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_abfc7336d338e1bc229de4024f6" FOREIGN KEY ("client_hn") REFERENCES "core"."client_profile_entity"("hn") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_ff1e29dd20b26021b200e604cd3" FOREIGN KEY ("dentist_id") REFERENCES "core"."dentist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD CONSTRAINT "FK_1c29367e0887ef06bf9be3d262f" FOREIGN KEY ("treatment_key") REFERENCES "core"."treatment_type_entity"("key") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD CONSTRAINT "FK_5d1e445b7642514fb500727c711" FOREIGN KEY ("treatment_record_id") REFERENCES "core"."treatment_record_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD CONSTRAINT "FK_8d9cb644e626fede748d36db971" FOREIGN KEY ("updated_by") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD CONSTRAINT "FK_f499465068acdb43613de837deb" FOREIGN KEY ("created_by") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
