import { createContext } from "react";

import type { MoodId } from "@/types/myPage";

export interface MoodContextValue {
  /** 아직 고르지 않았으면 undefined */
  moodId?: MoodId;
  setMoodId: (id: MoodId) => void;
}

export const MoodContext = createContext<MoodContextValue | null>(null);
