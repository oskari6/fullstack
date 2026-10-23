import { randomUUID } from "node:crypto";
import patients from "./data/patients.ts";
import type { Entry, NewPatient, NewPatientEntry, Patient } from "./types.ts";

export const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    ...newPatient,
    id: randomUUID().toString(),
    entries: [],
  };

  patients.push(patient);
  return patient;
};

export const addEntry = (
  newEntry: NewPatientEntry,
  patientId: string,
): Entry => {
  const foundPatient = patients.find((p) => p.id === patientId);
  if (!foundPatient) {
    throw new Error("No patient found");
  }
  const updatedEntry = {
    ...newEntry,
    id: randomUUID().toString(),
  };

  foundPatient.entries.concat(updatedEntry);
  return updatedEntry;
};
