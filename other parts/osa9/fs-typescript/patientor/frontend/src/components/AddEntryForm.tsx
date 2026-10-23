import { SyntheticEvent, useState } from "react";

import {
  Alert,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import patientService from "../services/patients";
import {
  Diagnosis,
  Entry,
  ENTRY_TYPE,
  EntryFormValues,
  EntryType,
  HEALTH_CHECK_RATNNG,
  HealthCheckRating,
  NewPatientEntry,
  RatingOption,
  TypeOption,
} from "../types";

interface Props {
  onSubmit: (values: Entry) => void;
  userId: string;
  diagnoses: Diagnosis[];
}

const initialEntryData: EntryFormValues = {
  type: ENTRY_TYPE.HealthCheck,
  date: "",
  description: "",
  specialist: "",
  healthCheckRating: HEALTH_CHECK_RATNNG.LowRisk,
  diagnosisCodes: [],
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: "",
  },
  discharge: {
    date: "",
    criteria: "",
  },
};

const typeOptions: TypeOption[] = Object.values(ENTRY_TYPE).map((v) => ({
  value: v,
  label: v.toString(),
}));

const ratingOptions: RatingOption[] = Object.entries(HEALTH_CHECK_RATNNG).map(
  ([key, value]) => ({
    value: value,
    label: `${value} — ${key.replace(/([A-Z])/g, " $1").trim()}`,
  }),
);

export const AddEntryForm = ({ onSubmit, userId, diagnoses }: Props) => {
  const [formData, setFormData] = useState<EntryFormValues>(initialEntryData);
  const [error, setError] = useState<string>("");

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const entry = await patientService.createEntry(
        convertEntryType(formData),
        userId,
      );
      onSubmit(entry);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h1>New {formData.type} Entry</h1>
      <form
        onSubmit={addEntry}
        style={{ display: "flex", flexDirection: "column", gap: 5 }}
      >
        <InputLabel sx={{ marginTop: 2.5 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={formData.type}
          onChange={({ target }) =>
            setFormData((prev) => ({
              ...prev,
              type: target.value as EntryType,
            }))
          }
        >
          {typeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={formData.date}
          onChange={({ target }) =>
            setFormData((prev) => ({
              ...prev,
              date: target.value,
            }))
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          label="Description"
          fullWidth
          value={formData.description}
          onChange={({ target }) =>
            setFormData((prev) => ({ ...prev, description: target.value }))
          }
        />
        <TextField
          label="Specialist"
          placeholder="Specialist"
          fullWidth
          value={formData.specialist}
          onChange={({ target }) =>
            setFormData((prev) => ({ ...prev, specialist: target.value }))
          }
        />
        {formData.type === ENTRY_TYPE.HealthCheck && (
          <>
            <InputLabel sx={{ marginTop: 2.5 }}>Health rating</InputLabel>
            <Select
              label="Health rating"
              fullWidth
              value={formData.healthCheckRating}
              onChange={({ target }) =>
                setFormData((prev) => ({
                  ...prev,
                  healthCheckRating: Number(target.value) as HealthCheckRating,
                }))
              }
            >
              {ratingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        {formData.type === ENTRY_TYPE.Hospital && (
          <>
            <InputLabel sx={{ marginTop: 2.5 }}>Discharge date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={formData.discharge.date}
              onChange={({ target }) =>
                setFormData((prev) => ({
                  ...prev,
                  discharge: {
                    ...prev.discharge,
                    date: target.value as string,
                  },
                }))
              }
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={formData.discharge.criteria}
              onChange={({ target }) =>
                setFormData((prev) => ({
                  ...prev,
                  discharge: { ...prev.discharge!, criteria: target.value },
                }))
              }
            />
          </>
        )}
        {formData.type === ENTRY_TYPE.OccupationalHealthcare && (
          <>
            <InputLabel sx={{ marginTop: 2.5 }}>
              Sick leave start date
            </InputLabel>
            <TextField
              type="date"
              fullWidth
              value={formData.sickLeave.startDate}
              onChange={({ target }) =>
                setFormData((prev) => ({
                  ...prev,
                  sickLeave: {
                    ...prev.sickLeave!,
                    startDate: target.value,
                  },
                }))
              }
            />
            <InputLabel sx={{ marginTop: 2.5 }}>Sick leave end date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={formData.sickLeave.endDate}
              onChange={({ target }) =>
                setFormData((prev) => ({
                  ...prev,
                  sickLeave: {
                    ...prev.sickLeave!,
                    endDate: target.value,
                  },
                }))
              }
            />
            <TextField
              label="Employer name"
              fullWidth
              value={formData.employerName}
              onChange={({ target }) =>
                setFormData((prev) => ({
                  ...prev,
                  employerName: target.value,
                }))
              }
            />
          </>
        )}

        <InputLabel>Diagnosis Codes</InputLabel>

        <Select
          multiple
          label="Diagnosis Codes"
          value={formData.diagnosisCodes}
          onChange={({ target }) =>
            setFormData((prev) => ({
              ...prev,
              diagnosisCodes: target.value as string[],
            }))
          }
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

function convertEntryType(formData: EntryFormValues): NewPatientEntry {
  const baseEntry = {
    date: formData.date,
    description: formData.description,
    specialist: formData.specialist,
    diagnosisCodes: formData.diagnosisCodes,
  };

  switch (formData.type) {
    case ENTRY_TYPE.HealthCheck:
      return {
        ...baseEntry,
        type: ENTRY_TYPE.HealthCheck,
        healthCheckRating: formData.healthCheckRating,
      };

    case ENTRY_TYPE.Hospital:
      return {
        ...baseEntry,
        type: ENTRY_TYPE.Hospital,
        discharge: formData.discharge,
      };

    case ENTRY_TYPE.OccupationalHealthcare:
      return {
        ...baseEntry,
        type: ENTRY_TYPE.OccupationalHealthcare,
        employerName: formData.employerName,
        sickLeave: formData.sickLeave,
      };

    default:
      return assertNever(formData.type);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};
