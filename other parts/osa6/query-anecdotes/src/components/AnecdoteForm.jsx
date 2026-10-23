import { useAnecdotes } from "../hooks/useAnecdotes";
import useNotifications from "../hooks/useNotifications";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();
  const { showMessage } = useNotifications();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      showMessage("too short anecdote, must have length 5 or more");
      return;
    }
    addAnecdote(content);
    event.target.reset();
    showMessage(`anecdote ${content} added`);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
