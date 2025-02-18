import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { TreatmentRecordEntity } from "./treatment-record.entity";

@Entity()
export class TreatmentRecordItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // @Column({ type: "varchar", length: 200 })
  // treatmentKey!: string;

  @Column({ type: "varchar", length: 200 })
  treatmentType!: string;

  @DeleteDateColumn({ select: false })
  deletedDate?: Date | null;

  @Column({ type: "varchar" })
  treatmentRecordId!: string;
  @JoinColumn([
    {
      name: "treatmentRecordId",
      referencedColumnName: "id",
    },
  ])
  @ManyToOne(
    () => TreatmentRecordEntity,
    (treatmentRecord) => treatmentRecord.treatmentItems
  )
  treatmentRecord?: TreatmentRecordEntity;

  @Column({ type: "jsonb" })
  treatmentValue!: any;
}
