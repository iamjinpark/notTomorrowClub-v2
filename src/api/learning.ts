import axios from "axios";
import type { StepData } from "@/types";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchLearningData = async (): Promise<StepData[]> => {
  const response = await instance.get<{ data: { sentence: StepData[] } }>(
    "/sentence/latest",
  );
  return response?.data?.data?.sentence;
};
