import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class DentistEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phoneNumber?: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  email?: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  lineId?: string | null;

  @Column({ type: "text", nullable: true })
  note?: string | null;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Column({ type: "boolean", default: false })
  isOrthoDentist!: boolean;

  @Column({ type: "varchar", length: 20, unique: true })
  dentistLicensId!: string;
}
