import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";
import type { Gender, NewPatient } from "./types.ts";
import { GENDERS } from "./types.ts";

export const parsePatientEntry = (object: unknown): NewPatient => {
  console.log(object);

  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "occupation" in object &&
    "gender" in object &&
    "ssn" in object &&
    "dateOfBirth" in object
  ) {
    const newEntry: NewPatient = {
      name: parseString(object.name, "name"),
      occupation: parseString(object.occupation, "occupation"),
      gender: parseGender(object.gender),
      ssn: parseString(object.ssn, "ssn"),
      dateOfBirth: parseDate(object.dateOfBirth),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseString = (comment: unknown, fieldName: string): string => {
  if (!isString(comment)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }

  return comment;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(GENDERS) as string[]).includes(param);
};

export const NewEntrySchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.enum(GENDERS),
  ssn: z.string().optional(),
  dateOfBirth: z.iso.date(),
});

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.body = NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
