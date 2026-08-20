import { type NextFunction, type Request, type Response } from "express";
import type {
  Diagnosis,
  Discharge,
  EntryType,
  HealthCheckRating,
  NewBaseEntry,
  NewPatientEntry,
  SickLeave,
} from "./types.ts";
import { ENTRY_TYPE, HEALTH_CHECK_RATING, NewPatientSchema } from "./types.ts";

// export const parsePatientEntry = (object: unknown): NewPatient => {
//   if (!object || typeof object !== "object") {
//     throw new Error("Incorrect or missing data");
//   }

//   if (
//     "name" in object &&
//     "occupation" in object &&
//     "gender" in object &&
//     "ssn" in object &&
//     "dateOfBirth" in object
//   ) {
//     const newEntry: NewPatient = {
//       name: parseString(object.name, "name"),
//       occupation: parseString(object.occupation, "occupation"),
//       gender: parseGender(object.gender),
//       ssn: parseString(object.ssn, "ssn"),
//       dateOfBirth: parseDate(object.dateOfBirth),
//     };

//     return newEntry;
//   }

//   throw new Error("Incorrect data: some fields are missing");
// };

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export const parseEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "specialist" in object &&
    "description" in object &&
    "date" in object
  ) {
    const type = parseType(object.type);

    const baseEntry: NewBaseEntry = {
      date: parseString(object.date, "date"),
      specialist: parseString(object.specialist, "specialist"),
      description: parseString(object.description, "description"),
      diagnosisCodes:
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : undefined,
    };

    switch (type) {
      case ENTRY_TYPE.HealthCheck:
        if (!("healthCheckRating" in object)) {
          throw new Error("Missing healthCheckRating");
        }

        return {
          ...baseEntry,
          type: ENTRY_TYPE.HealthCheck,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };

      case ENTRY_TYPE.Hospital:
        if (!("discharge" in object)) {
          throw new Error("Missing discharge");
        }

        return {
          ...baseEntry,
          type: ENTRY_TYPE.Hospital,
          discharge: parseDischarge(object.discharge),
        };

      case ENTRY_TYPE.OccupationalHealthcare:
        if (!("employerName" in object)) {
          throw new Error("Missing employerName");
        }

        return {
          ...baseEntry,
          type: ENTRY_TYPE.OccupationalHealthcare,
          employerName: parseString(object.employerName, "employerName"),
          sickLeave:
            "sickLeave" in object
              ? parseSickLeave(object.sickLeave)
              : undefined,
        };

      default:
        return assertNever(type);
    }
  }
  throw new Error("Incorrect data");
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Diagnosis["code"][] => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosisCodes");
  }

  return diagnosisCodes.map((code) => parseString(code, "diagnosisCode"));
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge");
  }

  if (!("date" in discharge) || !("criteria" in discharge)) {
    throw new Error("Incorrect discharge: some fields are missing");
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria, "discharge criteria"),
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect sickLeave");
  }

  if (!("startDate" in sickLeave) || !("endDate" in sickLeave)) {
    throw new Error("Incorrect sickLeave: some fields are missing");
  }

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing healthCheckRating: " + rating);
  }

  return rating;
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return (Object.values(HEALTH_CHECK_RATING) as number[]).includes(rating);
};

const parseType = (type: unknown): EntryType => {
  if (!isString(type) || !isType(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }

  return type;
};

const isType = (type: string): type is EntryType => {
  return (Object.values(ENTRY_TYPE) as string[]).includes(type);
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

// const parseGender = (gender: unknown): Gender => {
//   if (!gender || !isString(gender) || !isGender(gender)) {
//     throw new Error("Incorrect or missing gender: " + gender);
//   }
//   return gender;
// };

// const isGender = (param: string): param is Gender => {
//   return (Object.values(GENDERS) as string[]).includes(param);
// };

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.body = NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
