import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustTreatmentRecord1738203544302 implements MigrationInterface {
    name = 'AdjustTreatmentRecord1738203544302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP CONSTRAINT "FK_4f569570bc2bd527bd3d6134dfe"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" RENAME COLUMN "treatmentKey" TO "treatmentType"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_daeaa1f1702d48bbc9dc1886419"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_95ac42d203593c4e4d26ae35668"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ALTER COLUMN "note" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ALTER COLUMN "updatedBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ALTER COLUMN "createdBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_daeaa1f1702d48bbc9dc1886419" FOREIGN KEY ("updatedBy") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_95ac42d203593c4e4d26ae35668" FOREIGN KEY ("createdBy") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_95ac42d203593c4e4d26ae35668"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" DROP CONSTRAINT "FK_daeaa1f1702d48bbc9dc1886419"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ALTER COLUMN "createdBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ALTER COLUMN "updatedBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ALTER COLUMN "note" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_95ac42d203593c4e4d26ae35668" FOREIGN KEY ("createdBy") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_entity" ADD CONSTRAINT "FK_daeaa1f1702d48bbc9dc1886419" FOREIGN KEY ("updatedBy") REFERENCES "core"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" RENAME COLUMN "treatmentType" TO "treatmentKey"`);
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD CONSTRAINT "FK_4f569570bc2bd527bd3d6134dfe" FOREIGN KEY ("treatmentKey") REFERENCES "core"."treatment_type_entity"("key") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
