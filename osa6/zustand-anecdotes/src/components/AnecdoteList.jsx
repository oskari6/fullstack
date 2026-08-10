import "@testing-library/jest-dom/vitest";
import {
  useAnecdoteActions,
  useAnecdotes,
  useNotificationActions,
} from "../store";
import Filter from "./Filter";

export const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdoteActions();
  const { create } = useNotificationActions();

  const handleVote = async (anecdote) => {
    await vote(anecdote.id);
    await create(`You voted ${anecdote.content}`);
  };

  return (
    <>
      <Filter />
      {anecdotes &&
        anecdotes
          .toSorted((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <div data-testid="anecdote" key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
                {anecdote.votes === 0 && (
                  <button onClick={() => remove(anecdote.id)}>remove</button>
                )}
              </div>
            </div>
          ))}
    </>
  );
};
