import { useState } from "react";

import CardDocument from "@/components/myPage/card/CardDocument";
import { MY_PAGE_CARD } from "@/api/dummyData";
import type { NtcCardSide } from "@/types/myPage";

export default function MyPageCard() {
  // TODO: 서버 연동 후 mock 데이터를 실제 응답으로 교체
  const card = MY_PAGE_CARD;
  const [side, setSide] = useState<NtcCardSide>("front");

  return (
    <div className="bg-gray1 relative min-h-screen">
      <div className="mx-auto w-[45.25rem]">
        <CardDocument card={card} side={side} onSideChange={setSide} />
      </div>
    </div>
  );
}
