import type { CoursePart } from "../App";
import { Part } from "./Part";

interface Props {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: Props) => {
  return courseParts.map((cp) => (
    <div key={cp.name}>
      <Part coursePart={cp} />
    </div>
  ));
};
