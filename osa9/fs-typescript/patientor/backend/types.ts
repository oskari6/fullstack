import type z from "zod";
import type { NewEntrySchema } from "./parser";

export interface ErrorResponse {
  error: string;
}

export type NewPatient = z.infer<typeof NewEntrySchema>;
export interface Patient extends NewPatient {
  id: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
} as const;

export type Gender = (typeof GENDERS)[keyof typeof GENDERS];
export type PatientLite = Omit<Patient, "ssn">;
export type PatientsApiResponse = PatientLite[] | ErrorResponse;
export type DiagnosesApiResponse = Diagnosis[] | ErrorResponse;
export type PatientApiResponse = Patient | ErrorResponse;
