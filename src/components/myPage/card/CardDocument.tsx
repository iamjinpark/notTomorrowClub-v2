import CardDocHeader from "./CardDocHeader";
import CardPreview from "./CardPreview";
import CardDisclaimer from "./CardDisclaimer";
import CardDocFooter from "./CardDocFooter";
import type { NtcCard, NtcCardSide } from "@/types/myPage";

interface CardDocumentProps {
  card: NtcCard;
  side: NtcCardSide;
  onSideChange: (side: NtcCardSide) => void;
}

// 시안(Figma 86:14) 실측: 문서 724px, 밴드 높이 69 / 105 / 461 / 179 / 211 = 1025px.
export default function CardDocument({
  card,
  side,
  onSideChange,
}: CardDocumentProps) {
  return (
    <div className="w-[45.25rem] bg-white">
      <CardDocHeader card={card} side={side} />
      <div className="relative h-[28.8125rem]" data-band="body">
        <CardPreview card={card} side={side} onSideChange={onSideChange} />
      </div>
      <CardDisclaimer />
      <CardDocFooter card={card} />
    </div>
  );
}
