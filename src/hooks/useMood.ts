import { useContext } from "react";

import { MoodContext, type MoodContextValue } from "@/context/moodContext";

export function useMood(): MoodContextValue {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood는 MoodProvider 안에서만 쓸 수 있습니다");
  }
  return context;
}
