import { Gender } from "../entity/client-profile.entity";
import { z } from "zod";

export interface CreateClientRequest {
  nameTitle: string;
  firstName: string;
  lastName: string;
  nationalId?: string;
  phoneNumber: string;
  gender: Gender;
  // address?: Address | null;
  house?: string;
  subDistrict?: { id: number; zip_code: number };
  district?: number;
  province?: number;
  zipcode?: number;

  birthday?: Date;
  medicalCondition?: string;
  drugAllergy?: string;
  drugEat?: string;
  orthoDentistId?: number;
}

export const CreateClientSchema = z.object({
  nameTitle: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  nationalId: z.string().optional(),
  phoneNumber: z.string(),
  gender: z.nativeEnum(Gender),
  // address: z
  //   .object({
  house: z.string().optional(),
  subDistrict: z.object({ id: z.number(), zip_code: z.number() }).optional(),
  district: z.number().optional(),
  province: z.number().optional(),
  zipcode: z.number().optional(),
  // })
  // .optional(),
  birthday: z.string().optional(),
  medicalCondition: z.string().optional(),
  drugAllergy: z.string().optional(),
  drugEat: z.string().optional(),
  orthoDentistId: z.number().optional(),
});
