import express, { type Request, type Response } from "express";
import diagnoses from "./data/diagnoses.ts";
import patients from "./data/patients.ts";
import {
  type DiagnosesApiResponse,
  type NewPatient,
  type Patient,
  type PatientApiResponse,
  type PatientsApiResponse,
} from "./types.ts";

const router = express.Router();

router.get("/api/ping", (_req, res) => {
  res.send("pong");
});

router.get("/api/patients", (_req, res: Response<PatientsApiResponse>) => {
  return res
    .status(200)
    .json(patients.map(({ ssn: _ssn, ...patients }) => patients));
});
router.get("/api/diagnoses", (_req, res: Response<DiagnosesApiResponse>) => {
  return res.status(200).json(diagnoses);
});

router.post(
  "/api/patients",
  (
    req: Request<Record<string, never>, PatientApiResponse, NewPatient>,
    res: Response<PatientApiResponse>,
  ) => {
    const newPatient = req.body;

    const patient: Patient = {
      ...newPatient,
      id: "2",
    };

    patients.push(patient);
    return res.status(201).json(patient);
  },
);

export default router;
