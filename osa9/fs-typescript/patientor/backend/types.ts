import z from "zod";

export const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
} as const;

export const NewPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.enum(GENDERS),
  ssn: z.string().optional(),
  dateOfBirth: z.iso.date(),
});

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis["code"][];
}

export const HEALTH_CHECK_RATING = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export const ENTRY_TYPE = {
  HealthCheck: "HealthCheck",
  Hospital: "Hospital",
  OccupationalHealthcare: "OccupationalHealthcare",
} as const;

export type HealthCheckRating =
  (typeof HEALTH_CHECK_RATING)[keyof typeof HEALTH_CHECK_RATING];
export type EntryType = (typeof ENTRY_TYPE)[keyof typeof ENTRY_TYPE];

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: string;
  criteria: string;
}
export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface ErrorResponse {
  error: string;
}

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export type NewBaseEntry = Omit<BaseEntry, "id">;

export type NewPatientEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;
export type Gender = (typeof GENDERS)[keyof typeof GENDERS];
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type PatientsApiResponse = NonSensitivePatient[] | ErrorResponse;
export type PatientApiResponse = NonSensitivePatient | ErrorResponse;
export type DiagnosesApiResponse = Diagnosis[] | ErrorResponse;
