import type {} from "express";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import z from "zod";
import diagnoses from "./data/diagnoses.ts";
import patients from "./data/patients.ts";
import { newPatientParser } from "./parser.ts";
import * as dataService from "./service.ts";
import type { NewPatient } from "./types.ts";
import {
  type DiagnosesApiResponse,
  type PatientApiResponse,
  type PatientsApiResponse,
} from "./types.ts";

const router = express.Router();

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

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
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<PatientApiResponse>,
  ) => {
    try {
      const addedEntry = dataService.addPatient(req.body);
      return res.status(200).json(addedEntry);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      return res.status(400).send({ error: errorMessage });
    }
  },
);

router.use(errorMiddleware);

export default router;
