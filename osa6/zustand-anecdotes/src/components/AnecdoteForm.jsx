import { useAnecdoteActions, useNotificationActions } from "../store";

export const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { create } = useNotificationActions();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    await add(content);
    e.target.reset();
    await create("New anecdote created");
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
