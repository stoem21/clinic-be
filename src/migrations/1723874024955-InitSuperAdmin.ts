import { MigrationInterface, QueryRunner } from "typeorm";
import { Role, UserEntity } from "../entity/users.entity";
import { encrypt } from "../utils/helpers";

export class InitSuperAdmin1723874024955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new UserEntity();
    // have to using username and password from env
    user.username = "super_admin";
    user.isChangedPassword = false;
    user.role = Role.SUPER_ADMIN;
    user.password = await encrypt.encryptpass("admin123");
    await queryRunner.manager.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
