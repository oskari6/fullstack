import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3001/anecdotes";

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    const fetchAnecdotes = async () => {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch anecdote");
      }
      const data = await response.json();
      setAnecdotes(data);
    };

    fetchAnecdotes();
  }, []);

  const addAnecdote = async (newAnecdote) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newAnecdote,
        id: Math.round(Math.random() * 10000),
      }),
    };

    const response = await fetch(baseUrl, options);

    if (!response.ok) {
      throw new Error("Failed to create anecdote");
    }

    const data = await response.json();
    setAnecdotes((current) =>
      current.concat({
        ...data,
      }),
    );
  };

  const removeAnecdote = async (id) => {
    const options = {
      method: "DELETE",
    };

    const response = await fetch(`${baseUrl}/${id}`, options);

    if (!response.ok) {
      throw new Error("Failed to remove anecdote");
    }
    setAnecdotes((current) => {
      const updated = current.filter((anecdote) => anecdote.id !== id);

      console.log("before:", current);
      console.log("after:", updated);

      return updated;
    });
  };

  return {
    anecdotes,
    addAnecdote,
    removeAnecdote,
  };
};
