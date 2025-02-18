import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class TambonsEntity {
  @PrimaryColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name_th!: string;

  @Column({ type: "varchar", length: 100 })
  name_en!: string;

  @Column({ type: "integer" })
  amphure_id!: number;

  @Column({ type: "integer" })
  zip_code!: number;
}
