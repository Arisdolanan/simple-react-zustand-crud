import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCounterStore = create(
  devtools(
    immer((set) => ({
      // state
      count: 0,

      // action
      setIncrement: async () => {
        set((state) => ({ count: state.count + 1 }));
      },
      setDecrement: async () => {
        set((state) => ({ count: state.count - 1 }));
      },
      setReset: async () => {
        set({ count: 0 });
      },
    }))
  )
);
