import { randomUUID } from "node:crypto";
import patients from "./data/patients.ts";
import type { NewPatient, Patient } from "./types.ts";

export const addPatient = (newPatient: NewPatient) => {
  const patient: Patient = {
    ...newPatient,
    id: randomUUID().toString(),
  };

  patients.push(patient);
  return patient;
};
