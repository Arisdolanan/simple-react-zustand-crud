import axios from "axios";

export default {
  addStudent: async (payload) => {
    const { data: response } = await axios.post(`${import.meta.env.VITE_BASE_API}/students`, payload);
    return response;
  },
  getStudent: async () => {
    const { data: response } = await axios.get(`${import.meta.env.VITE_BASE_API}/students`);
    return response;
  },
  updateStudent: async (payload) => {
    const { data: response } = await axios.put(`${import.meta.env.VITE_BASE_API}/students/${payload.id}`, payload);
    return response;
  },
  deleteStudent: async (payload) => {
    const { data: response } = await axios.delete(`${import.meta.env.VITE_BASE_API}/students/${payload}`);
    return response;
  },
};
