export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  ssn?: string;
  dateOfBirth?: string;
}

export interface ErrorResponse {
  error: string;
}

export interface NewPatient {
  name: string;
  occupation: string;
  gender: string;
  ssn?: string;
  dateOfBirth?: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type PatientLite = Omit<Patient, "ssn">;
export type PatientsApiResponse = PatientLite[] | ErrorResponse;
export type DiagnosesApiResponse = Diagnosis[] | ErrorResponse;
export type PatientApiResponse = Patient | ErrorResponse;
