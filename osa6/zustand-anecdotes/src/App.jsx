import { useEffect } from "react";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { useAnecdoteActions, useNotifications } from "./store";

const App = () => {
  const { initialize } = useAnecdoteActions();
  const message = useNotifications();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification message={message} />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
