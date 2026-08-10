import { atomWithStorage } from "jotai/utils";

import type { MoodId } from "@/types/myPage";

// 서버가 무드를 보관하지 않아, 새로고침 후에도 남도록 localStorage에 둔다
export const moodAtom = atomWithStorage<MoodId | undefined>(
  "ntc.moodId",
  undefined
);
