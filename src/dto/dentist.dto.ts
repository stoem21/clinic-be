import { z } from "zod";

export interface CreateDentistRequest {
  name: string;
  phoneNumber?: string;
  email?: string;
  lineId?: string;
  note?: string;
  dentistLicensId: string;
  isOrthoDentist?: boolean;
}

export const DentistCreateSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().optional(), // have to validate length ?
  email: z.string().email().optional(),
  lineId: z.string().optional(),
  note: z.string().optional(),
  dentistLicensId: z.string(), // have to validate length ?
  isOrthoDentist: z.boolean().optional(),
});
