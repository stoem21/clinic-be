import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class TreatmentTypeEntity extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 200 })
  key!: string;

  @Column({ type: "varchar", length: 200 })
  label!: string;

  @Column({ type: "jsonb" })
  template!: any;
}
