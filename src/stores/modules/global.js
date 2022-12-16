import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useGlobalStore = create(
  devtools(
    immer((set) => ({
      // state
      isOpenModal: false,

      // action
      setOpenModal: async (payload) => {
        set((state) => {
          state.isOpenModal = payload;
        });
      },
    }))
  )
);
