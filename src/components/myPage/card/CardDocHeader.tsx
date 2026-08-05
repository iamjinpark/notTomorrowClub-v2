import logoImage from "@/assets/img/logo.svg";
import type { NtcCard, NtcCardSide } from "@/types/myPage";

interface CardDocHeaderProps {
  card: NtcCard;
  side: NtcCardSide;
}

// 시안(Figma 86:14 / 86:129) 실측 — 흰 헤더 69px + 노란 밴드 105px.
// text-cap-trim은 자신의 텍스트 줄에만 적용된다. 시안이 단일 텍스트 노드인 블록은
// <p> 하나에 <br>로 묶어야 하고, 여러 <p>를 감싼 <div>에 걸면 무효다.
export default function CardDocHeader({ card, side }: CardDocHeaderProps) {
  return (
    <>
      <div className="relative h-[4.3125rem]" data-band="header">
        <img
          src={logoImage}
          alt="NTC"
          className="absolute top-[1.5rem] left-[1.75rem] h-[1.6125rem] w-[3.9375rem]"
        />
        {/* 시안은 두 줄이 개별 텍스트 노드 + gap 6px */}
        <div className="font-roboto absolute top-[1.5625rem] left-[35.5rem] flex w-[8rem] flex-col gap-[0.375rem] text-right text-[0.75rem] leading-[1.2] font-medium text-[#2b2b2b]">
          <p className="text-cap-trim">{card.webUrl}</p>
          <p className="text-cap-trim">{card.issuedAt}</p>
        </div>
      </div>

      <div className="bg-lightyellow relative h-[6.5625rem]" data-band="issued">
        <p className="font-roboto text-cap-trim absolute top-[1.25rem] left-[1.75rem] w-[19.375rem] text-[0.75rem] leading-[1.2] font-medium text-[#2b2b2b]">
          NTC Membership Card
        </p>
        <p className="font-roboto text-cap-trim absolute top-[1.25rem] left-[22.5rem] w-[21.125rem] text-[0.75rem] leading-[0.875rem] font-medium text-[#2b2b2b]">
          Issued to: New Today Club Member
          <br />5 Sentences, Every Day
          {/* 뒷면에만 카드 번호가 붙는다 (시안 텍스트 박스 높이 37 -> 65) */}
          {side === "back" && (
            <>
              <br />
              &nbsp;
              <br />
              {card.cardNo}
            </>
          )}
        </p>
      </div>
    </>
  );
}
