import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import anecdoteService from "../../services/anecdotes";
import { useAnecdoteStore } from "../../store";
import { AnecdoteList } from "../AnecdoteList";

vi.mock("../../services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  },
}));

beforeEach(() => {
  cleanup();
  useAnecdoteStore.setState({ anecdotes: [], searchWord: "" });
});

describe("AnecdoteList", () => {
  it("renders anecdotes in descending order by votes", () => {
    const anecdotes = [
      { id: 1, content: "First", votes: 2 },
      { id: 2, content: "Second", votes: 10 },
      { id: 3, content: "Third", votes: 5 },
    ];

    useAnecdoteStore.setState({ anecdotes });

    render(<AnecdoteList />);

    const items = screen.getAllByTestId("anecdote");

    expect(items[0]).toHaveTextContent("Second");
    expect(items[1]).toHaveTextContent("Third");
    expect(items[2]).toHaveTextContent("First");
  });

  it("renders anecdotes by filter value", () => {
    const anecdotes = [
      { id: 1, content: "first xx", votes: 2 },
      { id: 2, content: "second xx", votes: 10 },
      { id: 3, content: "third yy", votes: 5 },
    ];

    useAnecdoteStore.setState({
      anecdotes,
      searchWord: "xx",
    });

    render(<AnecdoteList />);

    const items = screen.getAllByTestId("anecdote");

    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("second xx");
    expect(items[1]).toHaveTextContent("first xx");
  });

  it("voting updates the anecdote and shows notification", async () => {
    const user = userEvent.setup();

    const anecdote = {
      id: 1,
      content: "first anecdote",
      votes: 2,
    };

    useAnecdoteStore.setState({
      anecdotes: [anecdote],
      searchWord: "",
    });

    anecdoteService.update.mockResolvedValue({
      ...anecdote,
      votes: 3,
    });

    render(
      <>
        <AnecdoteList />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "vote" }));

    expect(anecdoteService.update).toHaveBeenCalledWith(1, {
      ...anecdote,
      votes: 3,
    });

    expect(screen.getByTestId("anecdote")).toHaveTextContent("has 3");
  });
});
