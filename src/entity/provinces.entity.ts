import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class ProvincesEntity {
  @PrimaryColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name_th!: string;

  @Column({ type: "varchar", length: 100 })
  name_en!: string;
}
