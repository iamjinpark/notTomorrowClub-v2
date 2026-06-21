import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import { STEP_DATA } from "@/api/dummyData";
import type { StepData } from "@/types";

const LearningDataContext = createContext<StepData[]>([]);

export function LearningDataLayout() {
  // teammaker 서버 미사용 → 더미데이터(STEP_DATA) 사용
  const learningData: StepData[] = STEP_DATA;

  return (
    <LearningDataContext.Provider value={learningData}>
      <Outlet />
    </LearningDataContext.Provider>
  );
}

export function useLearningData(): StepData[] {
  return useContext(LearningDataContext);
}
