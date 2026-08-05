import logoImage from "@/assets/img/logo.svg";
import nameplateImage from "@/assets/img/ntc-card-nameplate.svg";
import photoPlaceholder from "@/assets/img/ntc-card-photo-placeholder.png";
import type { NtcCard } from "@/types/myPage";

interface NtcCardFrontProps {
  card: NtcCard;
}

interface FieldProps {
  label: string;
  value: string;
  // 시안에서 NAME/EXPIRE 행만 값 영역이 156px, WEB URL/DAILY LIMIT 행은 166px
  wide?: boolean;
  tight?: boolean;
}

// line-height를 배수가 아닌 실측 px로 지정한다. 시안은 Figma의 text-box-trim이
// 걸려 있어 12px 텍스트의 박스 높이가 라벨 14 / 값 9다. 배수(1.2)를 쓰면 행 높이가
// 25 -> 30.8로 불어나 4행 합계가 130을 넘고 라이선스 문구와 겹친다.
function CardField({ label, value, wide, tight }: FieldProps) {
  return (
    <div className="flex items-center gap-[0.625rem]">
      <div className="font-roboto-condensed flex w-[0.625rem] shrink-0 flex-col gap-[0.3125rem] text-[0.625rem] font-medium">
        {/* 데이터가 아니라 카드 인쇄 양식에 찍힌 번호 */}
        <span className="leading-[0.75rem]">29</span>
        <span className="leading-[0.4375rem]">13</span>
      </div>
      <div
        className={`flex shrink-0 flex-col gap-[0.125rem] ${wide ? "w-[10.375rem]" : "w-[9.75rem]"}`}
      >
        <span className="font-roboto-condensed text-[0.75rem] leading-[0.875rem] font-medium uppercase">
          {label}
        </span>
        <span
          className={`font-roboto-mono text-[0.75rem] leading-[0.5625rem] font-medium ${tight ? "tracking-[-0.0375rem]" : ""}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// 시안(Figma 86:14) 실측 — 카드 352x217, 내부 요소는 절대 좌표.
export default function NtcCardFront({ card }: NtcCardFrontProps) {
  return (
    <div className="bg-lightyellow relative h-[13.5625rem] w-[22rem] rounded-[0.75rem] text-[#2b2b2b] shadow-[0.125rem_0.125rem_0.0625rem_0_rgba(0,0,0,0.25)]">
      <img
        src={logoImage}
        alt="NTC"
        className="absolute top-[1.125rem] left-[1.125rem] h-[1.3054rem] w-[3.1875rem]"
      />

      {/* 사진 자리 — 시안은 회색 체커보드 placeholder 이미지. 사용자 사진이 들어갈 슬롯 */}
      <img
        src={photoPlaceholder}
        alt=""
        className="absolute top-[3.4375rem] left-[1.125rem] h-[8.4375rem] w-[6.875rem] object-cover"
      />

      <span className="font-signature absolute top-[11.0625rem] left-[1.3125rem] rotate-[0.18deg] text-[1.375rem] leading-none tracking-[-0.04125rem] text-[#404040]">
        {card.signatureName}
      </span>

      {/* 시안 폰트(ABC ROM Extended Unlicensed Trial)를 쓸 수 없어 SVG로 대체한 고정 라벨 */}
      <img
        src={nameplateImage}
        alt="YOUR NAME HERE"
        className="absolute top-[1.25rem] left-[8.8125rem] h-[0.625rem] w-[10rem]"
      />

      <div className="font-roboto-mono absolute top-[2.875rem] left-[17.5625rem] w-[3.75rem] text-[0.5rem] leading-[0.5rem] font-medium text-[#656565]">
        <p>CLASS: NTC-5</p>
        <p>DAILY ACCESS</p>
      </div>

      <div className="absolute top-[2.75rem] left-[8.8125rem] flex w-[11rem] flex-col gap-[0.625rem]">
        <CardField label="Name" value={card.holderName} />
        <CardField label="Web URL" value={card.webUrl} wide />
        <CardField label="Daily limit" value={card.dailyLimit} wide />
        <CardField label="Expire" value={card.expire} tight />
      </div>

      {/* IC칩 — 시안은 그라디언트(multiply) 위에 사진 placeholder 이미지를 20%로 겹친다.
          그라디언트는 인라인으로 쓴다 (Tailwind 정지점 유틸리티가 rgba 알파를 정확히 못 옮김) */}
      <div className="absolute top-[8.4375rem] left-[19.125rem] h-[2.5625rem] w-[2.0625rem]">
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #c4c4c4 0%, rgba(94,94,94,0.37) 100%)",
          }}
        />
        <img
          src={photoPlaceholder}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-20"
        />
      </div>

      <p className="font-roboto-condensed absolute top-[12.0625rem] left-[8.8125rem] w-[12.375rem] text-[0.5625rem] leading-[1.2] font-medium tracking-[0.0028rem] text-[#d6d6d6]">
        NTC ROUTINE REPUBLIC MEMBER PRACTICE LICENSE
      </p>
    </div>
  );
}
