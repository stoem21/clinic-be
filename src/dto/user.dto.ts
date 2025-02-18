import { Role } from "../entity/users.entity";
import { z } from "zod";
export interface UserCreateRequest {
  username: string;
  password: string;
  role: string;
}
export const userCreateSchema = z.object({
  username: z.string().min(5).max(15),
  role: z.nativeEnum(Role),
});

export interface UserUpdateRequest {
  role: Role;
  resetPassword: boolean;
  recoveryUser: boolean;
}
export const userUpdateSchema = z.object({
  role: z.nativeEnum(Role).optional(),
  resetPassword: z.boolean().optional(),
  recoveryUser: z.boolean().optional(),
});

export interface UserUpdatePasswordRequest {
  password: string;
}
export const userUpdatePasswordSchema = z.object({
  password: z.string().min(8),
});

export interface TokenPayload {
  role: string;
  username: string;
  id: string;
}
