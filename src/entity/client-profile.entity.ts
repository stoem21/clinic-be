import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./users.entity";
import { DentistEntity } from "./dentist.entity";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NOT_SPECIFIED = "NOT_SPECIFIED",
}

export interface Address {
  house: string;
  subDistrict: number;
  district: number;
  province: number;
  zipcode: number;
}
// have to add master address for link this

@Entity()
export class ClientProfileEntity extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 100 })
  hn!: string;

  @Column({ type: "varchar", length: 20 })
  nameTitle!: string;

  @Column({ type: "varchar", length: 100 })
  firstName!: string;

  @Column({ type: "varchar", length: 100 })
  lastName!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  nationalId?: string | null;

  @Column({ type: "varchar", length: 20 })
  phoneNumber!: string;

  @Column({ type: "enum", enum: Gender })
  gender!: Gender;

  @Column({ type: "timestamptz", nullable: true })
  birthday!: Date | null;

  @Column({ type: "varchar", nullable: true, default: null })
  orthoDentistId!: string | null;
  @JoinColumn([
    {
      name: "orthoDentistId",
      referencedColumnName: "id",
    },
  ])
  @ManyToOne(() => DentistEntity, (dent) => dent.id)
  orthoDentist?: DentistEntity;

  @Column({ type: "jsonb", nullable: true, default: null })
  address?: Address | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  medicalCondition?: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  drugAllergy?: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  drugEat?: string | null;

  @Column({ type: "varchar", nullable: true })
  updatedBy?: string;
  @JoinColumn([
    {
      name: "updatedBy",
      referencedColumnName: "id",
    },
  ])
  @ManyToOne(() => UserEntity, (user) => user.id)
  updatedUser?: UserEntity;

  @Column({ type: "varchar", nullable: true })
  createdBy?: string;
  @JoinColumn([
    {
      name: "createdBy",
      referencedColumnName: "id",
    },
  ])
  @ManyToOne(() => UserEntity, (user) => user.id)
  createdUser?: UserEntity;
}
