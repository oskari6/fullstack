import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Diagnosis, Entry, HEALTH_CHECK_RATNNG } from "../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export const EntryInstance = ({ entry, diagnoses }: Props) => {
  const findDiagnosisNameByCode = (code: string): string => {
    if (!diagnoses) {
      return "";
    }
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : "";
  };

  if (!diagnoses) {
    return;
  }

  switch (entry.type) {
    case "HealthCheck":
      return (
        <>
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>
          <p>{entry.description}</p>
          {entry.healthCheckRating === HEALTH_CHECK_RATNNG.CriticalRisk ? (
            <FavoriteIcon htmlColor="red" />
          ) : entry.healthCheckRating === HEALTH_CHECK_RATNNG.HighRisk ? (
            <FavoriteIcon htmlColor="orange" />
          ) : entry.healthCheckRating === HEALTH_CHECK_RATNNG.LowRisk ? (
            <FavoriteIcon htmlColor="yellow" />
          ) : (
            <FavoriteIcon htmlColor="green" />
          )}
          <p>diagnose by {entry.specialist}</p>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((c: Diagnosis["code"]) => (
                <li>
                  {c} {findDiagnosisNameByCode(c)}
                </li>
              ))}
          </ul>
        </>
      );
    case "Hospital":
      return (
        <>
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>
          <p>{entry.description}</p>
          <p>diagnose by {entry.specialist}</p>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((c: Diagnosis["code"]) => (
                <li key={c}>
                  {c} {findDiagnosisNameByCode(c)}
                </li>
              ))}
          </ul>
          <p>
            Discharge: {entry.discharge.date} {entry.discharge.criteria}
          </p>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <p>
            {entry.date} <BusinessCenterIcon />
          </p>
          <p>{entry.description}</p>
          <p>diagnose by {entry.specialist}</p>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((c: Diagnosis["code"]) => (
                <li key={c}>
                  {c} {findDiagnosisNameByCode(c)}
                </li>
              ))}
          </ul>
          <p>
            Sick leave: {entry.sickLeave?.startDate} -{" "}
            {entry.sickLeave?.endDate}
          </p>
        </>
      );
    default:
      return assertNever(entry);
  }
};
