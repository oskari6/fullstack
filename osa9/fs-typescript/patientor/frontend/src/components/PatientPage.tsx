import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import diagnosesService from "../services/diagnoses";
import patientService from "../services/patients";
import { Diagnosis, Patient } from "../types";
import { AddEntryForm } from "./AddEntryForm";
import { EntryInstance } from "./EntryInstance";
import { Button } from "@mui/material";

export const PatientPage = () => {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        return;
      }
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  if (!patient || !diagnoses) {
    return null;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>{patient.name}</h1>
        <span>{patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}</span>
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <Button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? "Hide form" : "Add New Entry"}
      </Button>

      {formVisible && (
        <AddEntryForm
          onSubmit={(newEntry) =>
            setPatient((prev) =>
              prev
                ? {
                    ...prev,
                    entries: prev.entries.concat(newEntry),
                  }
                : undefined,
            )
          }
          userId={patient.id}
          diagnoses={diagnoses}
        />
      )}

      <div>
        <h1>entries</h1>
        <div>
          {patient.entries.map((e) => (
            <div key={e.id}>
              <EntryInstance diagnoses={diagnoses} entry={e} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
