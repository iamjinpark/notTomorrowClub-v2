import qrImage from "@/assets/img/ntc-card-qr.png";
import type { NtcCard } from "@/types/myPage";

interface CardDocFooterProps {
  card: NtcCard;
}

// 시안(Figma 86:83) 실측 — 밴드 211px = py 40 + 내용 131 + py 40.
// 내용은 QR(134x130) + gap 20 + 문구(144) + gap 20 + 면책(360).
export default function CardDocFooter({ card }: CardDocFooterProps) {
  return (
    <div
      className="bg-lightyellow flex h-[13.1875rem] gap-[1.25rem] px-[1.75rem] py-[2.5rem]"
      data-band="footer"
    >
      <div className="relative h-[8.125rem] w-[8.375rem] shrink-0 bg-white">
        <img
          src={qrImage}
          alt="NTC 카드 QR 코드"
          className="absolute top-[0.4914rem] left-[0.5556rem] size-[7.2641rem]"
        />
      </div>

      <div className="flex shrink-0 flex-col gap-[1.5rem] text-[#2b2b2b]">
        {/* 시안은 "Tap in."이 별도 단락이라 Tap in. / Write five. / Leave proud. 로 끊긴다 */}
        <div className="font-roboto w-[9rem] text-[1.5rem] leading-[1.6042rem]">
          <p>Tap in.</p>
          <p>Write five. Leave proud.</p>
        </div>
        <div className="font-roboto w-[8.5rem] text-[0.75rem] leading-[0.5625rem] font-medium">
          <p>@not.tomorrow.club</p>
          <p className="mt-[0.375rem]">{card.webUrl}</p>
        </div>
      </div>

      <p className="font-roboto w-[22.5rem] shrink-0 text-[1rem] leading-[1.1696rem] text-[#2b2b2b]">
        The NTC Card is not a credit card, debit card, gift card, prepaid card,
        or any financial instrument. It does not hold any monetary value. It
        cannot be used for purchases, payments, cash withdrawals, or any other
        financial transactions. It may, however, be used to remind you that five
        sentences are enough for today.
      </p>
    </div>
  );
}
