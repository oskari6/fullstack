//types
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export type NewBaseEntry = Omit<BaseEntry, "id">;
export type NewPatientEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type EntryType = (typeof ENTRY_TYPE)[keyof typeof ENTRY_TYPE];
export type HealthCheckRating =
  (typeof HEALTH_CHECK_RATNNG)[keyof typeof HEALTH_CHECK_RATNNG];

//consts
export const ENTRY_TYPE = {
  HealthCheck: "HealthCheck",
  Hospital: "Hospital",
  OccupationalHealthcare: "OccupationalHealthcare",
} as const;
export const HEALTH_CHECK_RATNNG = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;
//enum
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
//interfaces
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis["code"][];
}
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
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
export interface TypeOption {
  value: EntryType;
  label: string;
}
export interface RatingOption {
  value: HealthCheckRating;
  label: string;
}
export interface EntryFormValues {
  type: EntryType;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: string[];
  healthCheckRating: HealthCheckRating;
  discharge: Discharge;
  employerName: string;
  sickLeave: SickLeave;
}
