import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./users.entity";
import { ClientProfileEntity } from "./client-profile.entity";
import { DentistEntity } from "./dentist.entity";
import { TreatmentRecordItemEntity } from "./treatment-record-item.entity";

@Entity()
export class TreatmentRecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 200 })
  clientHN!: string;

  @Column({ type: "varchar" })
  dentistId!: string;

  @Column({ type: "timestamptz", nullable: true })
  treatmentDate!: Date;

  @OneToMany(
    () => TreatmentRecordItemEntity,
    (treatmentItem) => treatmentItem.treatmentRecord
  )
  treatmentItems!: TreatmentRecordItemEntity[];

  @Column({ type: "text", nullable: true })
  note?: string | null;

  @Column({ type: "varchar" })
  updatedBy?: string;
  @JoinColumn([
    {
      name: "updatedBy",
      referencedColumnName: "id",
    },
  ])
  @ManyToOne(() => UserEntity, (user) => user.id)
  updatedUser?: UserEntity;

  @Column({ type: "varchar" })
  createdBy?: string;
  @JoinColumn([
    {
      name: "createdBy",
      referencedColumnName: "id",
    },
  ])
  @ManyToOne(() => UserEntity, (user) => user.id)
  createdUser?: UserEntity;

  @JoinColumn([
    {
      name: "clientHN",
      referencedColumnName: "hn",
    },
  ])
  @ManyToOne(() => ClientProfileEntity, (clientProfile) => clientProfile.hn)
  clientProfile?: ClientProfileEntity;

  @JoinColumn([
    {
      name: "dentistId",
      referencedColumnName: "id",
    },
  ])
  @ManyToOne(() => DentistEntity, (dentist) => dentist.id)
  dentist?: DentistEntity;
}
