import { useCallback, useState } from "react";
import type { ReactNode } from "react";

import { MoodContext } from "@/context/moodContext";
import { MOODS } from "@/constants/mood";
import type { MoodId } from "@/types/myPage";

// 서버가 무드를 보관하지 않아, 새로고침 후에도 남도록 localStorage에 둔다
const STORAGE_KEY = "ntc.moodId";

function readStoredMood(): MoodId | undefined {
  const stored = Number(localStorage.getItem(STORAGE_KEY));
  return MOODS.some((mood) => mood.id === stored)
    ? (stored as MoodId)
    : undefined;
}

export function MoodProvider({ children }: { children: ReactNode }) {
  const [moodId, setStoredMood] = useState<MoodId | undefined>(readStoredMood);

  const setMoodId = useCallback((id: MoodId) => {
    setStoredMood(id);
    localStorage.setItem(STORAGE_KEY, String(id));
  }, []);

  return (
    <MoodContext.Provider value={{ moodId, setMoodId }}>
      {children}
    </MoodContext.Provider>
  );
}
