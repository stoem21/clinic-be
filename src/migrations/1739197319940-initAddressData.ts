import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { ProvincesEntity } from "../entity/provinces.entity";
import { TambonsEntity } from "../entity/tambons.entity";
import { AmphuresEntity } from "../entity/amphures.entity";

export class InitAddressData1739197319940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const filePath1 = path.join(
      __dirname,
      "./address-init/thai_provinces.json"
    );
    const data1 = JSON.parse(fs.readFileSync(filePath1, "utf8"));
    await queryRunner.manager.insert(ProvincesEntity, data1);
    const filePath2 = path.join(__dirname, "./address-init/thai_tambons.json");
    const data2 = JSON.parse(fs.readFileSync(filePath2, "utf8"));
    await queryRunner.manager.insert(TambonsEntity, data2);
    const filePath3 = path.join(__dirname, "./address-init/thai_amphures.json");
    const data3 = JSON.parse(fs.readFileSync(filePath3, "utf8"));
    await queryRunner.manager.insert(AmphuresEntity, data3);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "core"."provinces_entity"`);
    await queryRunner.query(`DELETE FROM "core"."tambons_entity"`);
    await queryRunner.query(`DELETE FROM "core"."amphures_entity"`);
  }
}
