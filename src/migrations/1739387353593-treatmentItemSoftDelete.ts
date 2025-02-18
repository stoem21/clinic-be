import { MigrationInterface, QueryRunner } from "typeorm";

export class TreatmentItemSoftDelete1739387353593 implements MigrationInterface {
    name = 'TreatmentItemSoftDelete1739387353593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" ADD "deletedDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."treatment_record_item_entity" DROP COLUMN "deletedDate"`);
    }

}
