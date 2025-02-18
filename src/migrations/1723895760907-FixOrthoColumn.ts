import { MigrationInterface, QueryRunner } from "typeorm";

export class FixOrthoColumn1723895760907 implements MigrationInterface {
    name = 'FixOrthoColumn1723895760907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP CONSTRAINT "FK_ec59a06dfe839def4709562ca85"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "ortho_dentist_id"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "orthoDentistId"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "orthoDentistId" integer`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD CONSTRAINT "FK_5718fa3d33e005c5c2283f9264a" FOREIGN KEY ("orthoDentistId") REFERENCES "core"."dentist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP CONSTRAINT "FK_5718fa3d33e005c5c2283f9264a"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" DROP COLUMN "orthoDentistId"`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "orthoDentistId" character varying`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD "ortho_dentist_id" integer`);
        await queryRunner.query(`ALTER TABLE "core"."client_profile_entity" ADD CONSTRAINT "FK_ec59a06dfe839def4709562ca85" FOREIGN KEY ("ortho_dentist_id") REFERENCES "core"."dentist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
