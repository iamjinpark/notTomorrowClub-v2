import { useEffect, useRef, useState } from "react";

import CardDocument from "@/components/myPage/card/CardDocument";
import { MY_PAGE_CARD } from "@/api/dummyData";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { NtcCardSide } from "@/types/myPage";

export default function MyPageCard() {
  // TODO: 서버 연동 후 mock 데이터를 실제 응답으로 교체
  const card = MY_PAGE_CARD;
  const [side, setSide] = useState<NtcCardSide>("front");

  const docRef = useRef<HTMLDivElement>(null);
  const [docSize, setDocSize] = useState({ width: 0, height: 0 });
  const { width: viewW, height: viewH } = useWindowSize();

  // 문서는 고정 크기 인쇄물이라 뷰포트에 맞춰 축소한다. offsetWidth/Height는
  // transform에 영향받지 않으므로 배율 계산이 자기 자신을 되먹이지 않는다.
  useEffect(() => {
    const el = docRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() =>
      setDocSize({ width: el.offsetWidth, height: el.offsetHeight })
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale =
    docSize.height && docSize.width && viewH && viewW
      ? Math.min(viewH / docSize.height, viewW / docSize.width)
      : 1;

  return (
    <div className="bg-gray1 h-dvh overflow-hidden">
      <div
        ref={docRef}
        className="mx-auto w-fit origin-top"
        style={{ transform: `scale(${scale})` }}
      >
        <CardDocument card={card} side={side} onSideChange={setSide} />
      </div>
    </div>
  );
}
