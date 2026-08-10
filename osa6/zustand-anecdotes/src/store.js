import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const logger = (config) => (set, get) =>
  config((...args) => {
    console.log("prev state", get());
    set(...args);
    console.log("next state", get());
  }, get);

const useNotificationStore = create(
  logger((set) => ({
    message: "",
    actions: {
      create: async (content) => {
        set(() => ({ message: content }));
        setTimeout(() => {
          set(() => ({ message: "" }));
        }, 5000);
      },
    },
  })),
);

export const useAnecdoteStore = create(
  logger((set) => ({
    anecdotes: [],
    searchWord: "",
    actions: {
      add: async (content) => {
        const newAnecdote = await anecdoteService.createNew(content);
        set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }));
      },
      setSearchWord: (value) => set(() => ({ searchWord: value })),
      initialize: async () => {
        const anecdotes = await anecdoteService.getAll();
        set(() => ({ anecdotes }));
      },
      vote: async (id) => {
        const anecdote = useAnecdoteStore
          .getState()
          .anecdotes.find((n) => n.id === id);
        const updated = await anecdoteService.update(id, {
          ...anecdote,
          votes: anecdote.votes + 1,
        });
        set((state) => ({
          anecdotes: state.anecdotes.map((n) => (n.id === id ? updated : n)),
        }));
      },
      remove: async (id) => {
        const anecdote = useAnecdoteStore
          .getState()
          .anecdotes.find((n) => n.id === id);
        await anecdoteService.remove(anecdote.id);
        set((state) => ({
          anecdotes: state.anecdotes.filter((n) => n.id !== id),
        }));
      },
    },
  })),
);

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const searchWord = useAnecdoteStore((state) => state.searchWord);
  if (searchWord !== "")
    return anecdotes.filter((a) => a.content.includes(searchWord));
  return anecdotes;
};
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
export const useNotifications = () =>
  useNotificationStore((state) => state.message);
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
