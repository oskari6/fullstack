import type { CoursePart } from "../App";

interface Props {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export const Part = ({ coursePart }: Props) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <>
          <b key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>{coursePart.description}</p>
        </>
      );
    case "group":
      return (
        <>
          <b key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </>
      );
    case "background":
      return (
        <>
          <b key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>{coursePart.description}</p>
          <p>submit to{coursePart.backgroundMaterial}</p>
        </>
      );
    case "special":
      return (
        <>
          <b key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>
            {coursePart.description}
            <p>
              required skills:{" "}
              {coursePart.requirements
                ? coursePart.requirements.join(", ")
                : ""}
            </p>
          </p>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};
