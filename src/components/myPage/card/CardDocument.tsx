import CardPreview from "./CardPreview";
import type { NtcCard, NtcCardSide } from "@/types/myPage";

interface CardDocumentProps {
  card: NtcCard;
  side: NtcCardSide;
  onSideChange: (side: NtcCardSide) => void;
}

// 시안(Figma 86:14) 실측: 문서 724px, 밴드 높이 69 / 105 / 461 / 179 / 211 = 1025px.
// 좌우 콘텐츠 패딩 28px.
export default function CardDocument({
  card,
  side,
  onSideChange,
}: CardDocumentProps) {
  return (
    <div className="w-[45.25rem] bg-white">
      <div className="h-[4.3125rem] px-[1.75rem]" data-band="header" />
      <div
        className="bg-lightyellow h-[6.5625rem] px-[1.75rem]"
        data-band="issued"
      />
      <div className="relative h-[28.8125rem]" data-band="body">
        <CardPreview card={card} side={side} onSideChange={onSideChange} />
      </div>
      <div
        className="h-[11.1875rem] bg-black px-[1.75rem]"
        data-band="disclaimer"
      />
      <div
        className="bg-lightyellow h-[13.1875rem] px-[1.75rem]"
        data-band="footer"
      />
    </div>
  );
}
