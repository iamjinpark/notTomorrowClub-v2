import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchLearningData = async () => {
  const response = await instance.get("/sentence/latest");
  return response.data.data.sentence;
};
