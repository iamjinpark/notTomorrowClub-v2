import barcodeVerticalImage from "@/assets/img/ntc-card-barcode-v.png";
import barcodeHorizontalImage from "@/assets/img/ntc-card-barcode-h.svg";
import type { NtcCard } from "@/types/myPage";

interface NtcCardBackProps {
  card: NtcCard;
}

// 시안(Figma 86:129) 실측 — 카드 352x217, 내부 요소는 절대 좌표.
// line-height는 앞면과 같은 이유로 배수 대신 실측 px을 쓴다.
export default function NtcCardBack({ card }: NtcCardBackProps) {
  return (
    <div className="bg-lightyellow relative h-[13.5625rem] w-[22rem] overflow-hidden rounded-[0.75rem] text-[#2b2b2b] shadow-[0.125rem_0.125rem_0.0625rem_0_rgba(0,0,0,0.25)]">
      {/* 마그네틱 스트라이프. 시안은 #000 -> #424242 -> #000 그라디언트에 mix-blend-multiply인데,
          multiply는 채널별 상수 곱이라 그라디언트 보간과 교환 가능하다. 노란 카드색을 미리 곱한
          값을 쓰면 결과가 동일하면서 blend mode 의존이 없어진다 (html2canvas가 blend를 격리하지
          못해 다운로드 이미지에서 카드 전체가 어두워졌다). 정지점은 인라인 — Tailwind black
          토큰은 #2b2b2b이고 via 위치 유틸리티도 적용되지 않는다 */}
      <div
        className="absolute top-[1.375rem] left-0 h-[3.6875rem] w-[22rem]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 0%, #3f4218 61.058%, #000 100%)",
        }}
      />

      {/* 세로 바코드 — 흰 박스 위에 얹힌다 */}
      <div className="absolute top-[5.0625rem] left-0 h-[4.4375rem] w-[2.3125rem] bg-white" />
      <img
        src={barcodeVerticalImage}
        alt=""
        className="absolute top-[5.25rem] left-[-0.0625rem] h-[4.125rem] w-[1.875rem]"
      />

      <p className="font-roboto-mono text-cap-trim absolute top-[5.4375rem] left-[2rem] w-[20rem] text-[0.5rem] leading-[0.625rem] font-medium tracking-[0.0025rem]">
        NOT AN OFFICIAL IDENTIFICATION CARD.
        <br />
        FOR NTC MEMBERSHIP AND ROUTINE PRACTICE ONLY.
        <br />
        REST: NONE
        <br />
        &nbsp;
        <br />
        No perfect grammar required.
      </p>

      <span className="font-signature absolute top-[7.375rem] left-[15.8125rem] text-[0.8125rem] leading-none text-[#404040]">
        {card.signatureName}
      </span>

      {/* 시안은 Roboto Condensed Regular이고 박스(67px)를 넘겨도 줄바꿈하지 않는다 */}
      <p className="font-roboto-condensed text-cap-trim absolute top-[8.5rem] left-[16.625rem] w-[4.1875rem] text-[0.5rem] leading-[0.625rem] font-normal tracking-[0.0025rem] whitespace-nowrap">
        Emergency Contact:
        <br />
        you who did not quit.
        <br />
        &nbsp;
        <br />
        Allergic reaction to:
        <br />
        Overthinking
        <br />
        Perfect grammar
        <br />
        Starting tomorrow
      </p>

      {/* 일련번호 — 시안은 가로 바코드 왼쪽에 아래에서 위로 읽히게 회전 */}
      <span className="font-roboto-condensed absolute top-[9.6875rem] left-[2.5rem] h-[2.5rem] rotate-180 text-[0.5rem] leading-none font-medium [writing-mode:vertical-rl]">
        {card.serialNo}
      </span>

      <img
        src={barcodeHorizontalImage}
        alt=""
        className="absolute top-[9.25rem] left-[3.0625rem] h-[2.9375rem] w-[11.4375rem]"
      />

      <p className="font-roboto-mono text-cap-trim absolute top-[12.375rem] left-[3.0625rem] w-[9.6875rem] text-[0.5rem] leading-[1.2] font-medium tracking-[0.0025rem]">
        SCAN TO RETURN TO TODAY&rsquo;S PHRASE
      </p>
    </div>
  );
}
