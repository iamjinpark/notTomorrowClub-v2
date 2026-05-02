import { createContext, useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchLearningData } from "@/api/learning";
import { STEP_DATA } from "@/api/dummyData";
import type { StepData } from "@/types";

const LearningDataContext = createContext<StepData[]>([]);

export function LearningDataLayout() {
  const [learningData, setLearningData] = useState<StepData[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLearningData();
        setLearningData(data);
      } catch (error) {
        console.error("Failed to load learning data:", error);
        setLearningData(STEP_DATA);
      }
    };
    load();
  }, []);

  return (
    <LearningDataContext.Provider value={learningData}>
      <Outlet />
    </LearningDataContext.Provider>
  );
}

export function useLearningData(): StepData[] {
  return useContext(LearningDataContext);
}
