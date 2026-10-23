import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Todo } from "./Todo";

test("renders todo text", () => {
  const todo = {
    text: "Learn about containers",
    done: false,
  };

  render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />);

  expect(screen.getByText("Learn about containers")).toBeDefined();
});
