import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { BaseEntity } from "./base.entity";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity()
@Unique(["username"])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  @Length(4, 20)
  username!: string;

  @Column({ type: "varchar" })
  @Length(4, 100)
  password!: string;

  @Column({ type: "boolean", default: false })
  isChangedPassword!: boolean;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  @IsNotEmpty()
  role!: Role;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
