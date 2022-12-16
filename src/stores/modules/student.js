import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import StudentService from "@/services/StudentService";

export const useStudentStore = create(
  devtools(
    immer((set, get) => ({
      // state
      student: [],

      // action
      addStudent: async (payload) => {
        const response = await StudentService.addStudent(payload);
        set((state) => {
          state.student.push(response);
        });
      },
      getStudent: async () => {
        const response = await StudentService.getStudent();
        set((state) => {
          state.student = response;
        });
      },
      updateStudent: async (payload) => {
        const response = await StudentService.updateStudent(payload);
        set((state) => {
          let dataState = state.student.filter((c) => c.id !== payload.id);
          dataState.push(response);
          state.student = dataState;
        });
      },
      deleteStudent: async (payload) => {
        const response = await StudentService.deleteStudent(payload);
        if (response) {
          set((state) => {
            state.student = state.student.filter((item) => item.id !== payload);
          });
        }
      },
      getStudentById: async (payload) => {
        let data = get().student.filter((c) => c.id === Number(payload));
        if (data) {
          return data[0];
        }
      },
    }))
  )
);
