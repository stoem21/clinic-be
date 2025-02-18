import { z } from "zod";

export interface TreatmentItem {
  type: string;
  data: any;
}

export interface CreateTreatmentRequest {
  clientHN: string;
  dentistId: string;
  treatmentDate: string;
  treatmentItems: TreatmentItem[];
  note?: string;
}

export interface UpdateTreatmentRequest {
  clientHN: string;
  dentistId: string;
  treatmentDate: string;
  treatmentItems: (TreatmentItem & { id: string })[];
  note?: string;
}

export const CreateTreatmentSchema = z.object({
  treatmentDate: z.string(),
  clientHN: z.string(),
  dentistId: z.number(),
  note: z.string().optional(),
  treatmentItems: z.array(
    z.object({
      type: z.string(),
      data: z.any(),
    })
  ),
});

export const UpdateTreatmentSchema = z.object({
  treatmentDate: z.string(),
  clientHN: z.string(),
  dentistId: z.number(),
  note: z.string().optional(),
  treatmentItems: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      data: z.any(),
    })
  ),
});
