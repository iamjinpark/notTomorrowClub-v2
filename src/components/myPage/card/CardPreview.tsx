import NtcCardFront from "./NtcCardFront";
import NtcCardBack from "./NtcCardBack";
import type { NtcCard, NtcCardSide } from "@/types/myPage";

interface CardPreviewProps {
  card: NtcCard;
  side: NtcCardSide;
  onSideChange: (side: NtcCardSide) => void;
}

const SIDES: { value: NtcCardSide; label: string }[] = [
  { value: "front", label: "Front" },
  { value: "back", label: "Back" },
];

// 시안(Figma 86:14) 실측 — 본문 밴드는 문서 y=174에서 시작하므로 모든 y는 174를 뺀 값.
export default function CardPreview({
  card,
  side,
  onSideChange,
}: CardPreviewProps) {
  return (
    <>
      {/* Welcome 블록 — 문서 (29, 207) */}
      <div className="absolute top-[2.0625rem] left-[1.8125rem] w-[18rem] text-[#2b2b2b]">
        <p className="font-roboto text-cap-trim text-[1.375rem] leading-[1.23]">
          Welcome to NTC CLUB
        </p>
        <p className="font-roboto text-cap-trim mt-[1.375rem] text-[1rem] leading-[1.25rem]">
          Five sentences a day
          <br />
          one small step
          <br />
          for your better routine
        </p>
      </div>

      {/* 카드 — 문서 (350, 207) */}
      <div className="absolute top-[2.0625rem] left-[21.875rem]">
        {side === "front" ? (
          <NtcCardFront card={card} />
        ) : (
          <NtcCardBack card={card} />
        )}
      </div>

      {/* Front / Back 토글 — 문서 (603, 444) */}
      <div className="font-roboto absolute top-[16.875rem] left-[37.6875rem] flex items-center gap-[0.9375rem] text-[1rem] leading-[1.23] text-[#2b2b2b]">
        {SIDES.map((s) => (
          <button
            key={s.value}
            type="button"
            aria-pressed={side === s.value}
            onClick={() => onSideChange(s.value)}
            className="text-cap-trim hover:underline"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Grade — 문서 (28, 481) */}
      <div className="font-roboto text-cap-trim absolute top-[19.1875rem] left-[1.75rem] w-[16.0625rem] text-[1.375rem] leading-[1.23] text-[#d5d5d5]">
        <p>Grade:</p>
        <p>{card.grade}</p>
      </div>

      {/* Sign 라벨 + 밑줄 — 문서 (28, 552), 밑줄 y=588 */}
      <div className="absolute top-[23.625rem] left-[1.75rem] w-[15.0625rem]">
        <p className="font-roboto text-[0.75rem] leading-none font-medium text-[#b1b1b1]">
          Sign
        </p>
        {/* 시안은 굵기 0.8px 검정 선 */}
        <div className="mt-[1.5rem] h-[0.05rem] w-full bg-black" />
      </div>

      {/* 서명 — 문서 (76, 555) */}
      <span className="font-signature absolute top-[23.8125rem] left-[4.75rem] text-[3.125rem] leading-none tracking-[-0.09375rem] text-[#404040]">
        {card.signatureName}
      </span>
    </>
  );
}
