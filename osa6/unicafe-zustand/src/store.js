import { create } from "zustand";

const useCounterStore = create((set) => ({
  counters: {
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  },
  actions: {
    good: () =>
      set((state) => {
        const good = state.counters.good + 1;
        const neutral = state.counters.neutral;
        const bad = state.counters.bad;
        const all = good + neutral + bad;

        return {
          counters: {
            good,
            neutral,
            bad,
            all,
            average: (good - bad) / all,
            positive: (good / all) * 100,
          },
        };
      }),

    neutral: () =>
      set((state) => {
        const good = state.counters.good;
        const neutral = state.counters.neutral + 1;
        const bad = state.counters.bad;
        const all = good + neutral + bad;

        return {
          counters: {
            good,
            neutral,
            bad,
            all,
            average: (good - bad) / all,
            positive: (good / all) * 100,
          },
        };
      }),

    bad: () =>
      set((state) => {
        const good = state.counters.good;
        const neutral = state.counters.neutral;
        const bad = state.counters.bad + 1;
        const all = good + neutral + bad;

        return {
          counters: {
            good,
            neutral,
            bad,
            all,
            average: (good - bad) / all,
            positive: (good / all) * 100,
          },
        };
      }),
  },
}));

export const useCounters = () => useCounterStore((state) => state.counters);
export const useCounterControls = () =>
  useCounterStore((state) => state.actions);
