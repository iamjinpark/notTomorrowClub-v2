import { useState } from "react";

import ModalCloseButton from "./ModalCloseButton";
import ModalActions from "./ModalActions";
import { MOODS } from "@/constants/mood";
import type { MoodId } from "@/types/myPage";

interface MoodPickerModalContentProps {
  onClose: () => void;
  moodId?: MoodId;
  onSave?: (moodId: MoodId) => void;
}

// 시안(Figma 90:1634) 실측 — 배경 gray6, 패딩 pt 52 / pb 47 / px 115.
// 스와치 31.652px(간격 9.739), 선택 표시 12.174px 정사각형.
export default function MoodPickerModalContent({
  onClose,
  moodId,
  onSave,
}: MoodPickerModalContentProps) {
  const [selected, setSelected] = useState<MoodId | undefined>(moodId);

  return (
    <div className="bg-gray6 relative w-[42.25rem] px-[7.1875rem] pt-[3.25rem] pb-[2.9375rem]">
      <ModalCloseButton onClose={onClose} />

      <div className="flex flex-col items-center gap-[2.1875rem] text-[#2b2b2b]">
        <div className="flex flex-col items-center gap-[0.75rem] text-center">
          <p className="en-title-lg leading-none">How are you feeling today?</p>
          <p className="en-body-sm leading-[1.25rem]">Pick your mood color!</p>
        </div>

        <div
          role="radiogroup"
          aria-label="오늘의 기분"
          className="flex gap-[0.6087rem]"
        >
          {MOODS.map((mood) => {
            const isSelected = selected === mood.id;
            return (
              <button
                key={mood.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={mood.label}
                onClick={() => setSelected(mood.id)}
                className="flex flex-col items-center gap-[0.7614rem]"
              >
                <img
                  src={mood.icon}
                  alt=""
                  className="size-[1.9783rem] shrink-0"
                />
                <span
                  className={`size-[0.7609rem] shrink-0 ${
                    isSelected
                      ? "border-2 border-white bg-[#2b2b2b]"
                      : "bg-white"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <ModalActions
          onCancel={onClose}
          onSave={() => {
            if (selected) onSave?.(selected);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
