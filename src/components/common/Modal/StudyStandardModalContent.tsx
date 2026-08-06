import { useState } from "react";

import ModalCloseButton from "./ModalCloseButton";
import ModalActions from "./ModalActions";
import type { StudyDataStandard } from "@/types/myPage";

interface StudyStandardModalContentProps {
  onClose: () => void;
  standard: StudyDataStandard;
  onSave?: (standard: StudyDataStandard) => void;
}

const ROWS: { key: keyof StudyDataStandard; label: string }[] = [
  // 시안 표기가 "Times Writen"이라 오탈자로 보이지만 그대로 따른다
  { key: "timeStudied", label: "Time Studied" },
  { key: "timesWritten", label: "Times Writen" },
  { key: "daysAttended", label: "Days Attended" },
];

const MIN_DAYS = 0;
const MAX_DAYS = 600;
const STEP_DAYS = 10;

// 시안(Figma 90:1338) 실측 — 760x394, 배경 gray6, 패딩 pt 52 / pb 47 / px 115.
export default function StudyStandardModalContent({
  onClose,
  standard,
  onSave,
}: StudyStandardModalContentProps) {
  const [draft, setDraft] = useState(standard);

  return (
    <div className="bg-gray6 relative w-[47.5rem] px-[7.1875rem] pt-[3.25rem] pb-[2.9375rem]">
      <ModalCloseButton onClose={onClose} />

      <div className="flex flex-col items-center gap-[2.1875rem] text-[#2b2b2b]">
        <p className="en-title-lg leading-none">
          Custom your study data standard
        </p>
        <p className="en-body-sm leading-[1.25rem]">
          If you want to more attend your data, custom detail mode
        </p>

        <div className="flex flex-col gap-[1.6875rem]">
          {ROWS.map(({ key, label }) => (
            <div key={key} className="flex items-center">
              <span className="en-body-sm w-[7.4375rem] leading-[1.25rem]">
                {label}
              </span>
              <span className="en-body-sm w-[5.875rem] leading-[1.25rem]">
                ( {draft[key]} days )
              </span>
              <input
                type="range"
                className="study-slider"
                min={MIN_DAYS}
                max={MAX_DAYS}
                step={STEP_DAYS}
                value={draft[key]}
                aria-label={`${label} 기준 일수`}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, [key]: Number(e.target.value) }))
                }
              />
            </div>
          ))}
        </div>

        <ModalActions
          onCancel={onClose}
          onSave={() => {
            onSave?.(draft);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
