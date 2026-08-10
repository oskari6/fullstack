import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import useNotifications from "./hooks/useNotifications";

const App = () => {
  const { anecdotes, error, vote, isPending } = useAnecdotes();
  const { message, showMessage } = useNotifications();

  if (error) {
    return <p>anecdote service not available due to problems in server</p>;
  }
  if (isPending) {
    return <p>loading...</p>;
  }

  const onVote = async (anecdote) => {
    vote(anecdote);
    showMessage(`anecdote ${anecdote.content} voted`);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={message} />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
