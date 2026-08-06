import mood1 from "@/assets/img/ntc-mood-1.svg";
import mood2 from "@/assets/img/ntc-mood-2.svg";
import mood3 from "@/assets/img/ntc-mood-3.svg";
import mood4 from "@/assets/img/ntc-mood-4.svg";
import mood5 from "@/assets/img/ntc-mood-5.svg";
import mood6 from "@/assets/img/ntc-mood-6.svg";
import mood7 from "@/assets/img/ntc-mood-7.svg";
import type { MoodId } from "@/types/myPage";

// 프로필 무드. 모달의 선택지와 프로필 아바타가 함께 쓴다.
export const MOODS: { id: MoodId; icon: string; label: string }[] = [
  { id: 1, icon: mood1, label: "무표정" },
  { id: 2, icon: mood2, label: "기쁨" },
  { id: 3, icon: mood3, label: "속상함" },
  { id: 4, icon: mood4, label: "설렘" },
  { id: 5, icon: mood5, label: "행복" },
  { id: 6, icon: mood6, label: "덤덤함" },
  { id: 7, icon: mood7, label: "지침" },
];

export const findMood = (id?: MoodId) => MOODS.find((m) => m.id === id);
