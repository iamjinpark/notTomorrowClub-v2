import logoImage from "@/assets/img/logo.svg";
import type { NtcCard, NtcCardSide } from "@/types/myPage";

interface CardDocHeaderProps {
  card: NtcCard;
  side: NtcCardSide;
}

// 시안(Figma 86:14 / 86:129) 실측 — 흰 헤더 69px + 노란 밴드 105px.
export default function CardDocHeader({ card, side }: CardDocHeaderProps) {
  return (
    <>
      <div className="relative h-[4.3125rem]" data-band="header">
        <img
          src={logoImage}
          alt="NTC"
          className="absolute top-[1.5rem] left-[1.75rem] h-[1.6125rem] w-[3.9375rem]"
        />
        <div className="font-roboto absolute top-[1.5625rem] left-[35.5rem] flex w-[8rem] flex-col gap-[0.375rem] text-right text-[0.75rem] leading-[0.5625rem] font-medium text-[#2b2b2b]">
          <p>{card.webUrl}</p>
          <p>{card.issuedAt}</p>
        </div>
      </div>

      <div className="bg-lightyellow relative h-[6.5625rem]" data-band="issued">
        <p className="font-roboto absolute top-[1.25rem] left-[1.75rem] w-[19.375rem] text-[0.75rem] leading-[0.9rem] font-medium text-[#2b2b2b]">
          NTC Membership Card
        </p>
        <div className="font-roboto absolute top-[1.25rem] left-[22.5rem] w-[21.125rem] text-[0.75rem] leading-[0.9rem] font-medium text-[#2b2b2b]">
          <p>Issued to: New Today Club Member</p>
          <p>5 Sentences, Every Day</p>
          {/* 뒷면에만 카드 번호가 붙는다 (시안 텍스트 박스 높이 37 -> 65) */}
          {side === "back" && (
            <>
              <p>&nbsp;</p>
              <p>{card.cardNo}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
