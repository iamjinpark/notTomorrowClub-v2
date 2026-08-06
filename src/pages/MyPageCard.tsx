import { useEffect, useRef, useState } from "react";

import CardDocument from "@/components/myPage/card/CardDocument";
import CardToolbar from "@/components/myPage/card/CardToolbar";
import { MY_PAGE_CARD } from "@/api/dummyData";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { NtcCardSide } from "@/types/myPage";

const ZOOM_STEP = 0.1;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2;

export default function MyPageCard() {
  // TODO: 서버 연동 후 mock 데이터를 실제 응답으로 교체
  const card = MY_PAGE_CARD;
  const [side, setSide] = useState<NtcCardSide>("front");
  const [zoom, setZoom] = useState(1);

  const docRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
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

  const fitScale =
    docSize.height && docSize.width && viewH && viewW
      ? Math.min(viewH / docSize.height, viewW / docSize.width)
      : 1;

  const changeZoom = (delta: number) =>
    setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z + delta)));

  const [shareResult, setShareResult] = useState<"copied" | "failed" | null>(
    null
  );

  // 클립보드는 보안 컨텍스트가 아니거나 권한이 없으면 실패한다.
  // 잡지 않으면 버튼이 아무 반응 없이 죽은 것처럼 보인다.
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareResult("copied");
    } catch {
      setShareResult("failed");
    }
  };

  // 복사 안내는 잠깐만 띄운다
  useEffect(() => {
    if (!shareResult) return;
    const timer = setTimeout(() => setShareResult(null), 2000);
    return () => clearTimeout(timer);
  }, [shareResult]);

  const handleExpand = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen();
  };

  // 화면의 문서는 transform으로 축소돼 있어 그대로 캡처하면 배율이 섞인다.
  // ReviewWordsForCapture와 같은 방식으로 화면 밖 원본 크기 노드를 캡처한다.
  const handleDownload = async () => {
    if (!exportRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
    });
    const link = document.createElement("a");
    link.download = `ntc-card-${side}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="bg-gray1 card-viewport relative h-dvh overflow-hidden">
      <div
        ref={docRef}
        className="card-scale mx-auto w-fit origin-top"
        style={{ transform: `scale(${fitScale * zoom})` }}
      >
        <CardDocument card={card} side={side} onSideChange={setSide} />
      </div>

      <CardToolbar
        onDownload={handleDownload}
        onPrint={() => window.print()}
        onShare={handleShare}
        onZoomIn={() => changeZoom(ZOOM_STEP)}
        onZoomOut={() => changeZoom(-ZOOM_STEP)}
        onExpand={handleExpand}
      />

      {/* 시안에 없는 요소지만, 클립보드 복사는 결과가 보이지 않으면 버튼이 고장난 것처럼 보인다 */}
      <p
        role="status"
        aria-live="polite"
        className={`ko-caption-1 pointer-events-none fixed bottom-[1.5rem] left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-[1rem] py-[0.5rem] text-white transition-opacity print:hidden ${
          shareResult ? "opacity-100" : "opacity-0"
        }`}
      >
        {shareResult === "copied" && "카드 주소를 복사했습니다"}
        {shareResult === "failed" &&
          "복사에 실패했습니다. 주소창을 복사해 주세요"}
      </p>

      {/* 다운로드용 원본 크기 사본 (화면 밖) */}
      <div
        ref={exportRef}
        className="card-export fixed top-0 left-[-9999px] print:hidden"
      >
        <CardDocument card={card} side={side} onSideChange={setSide} />
      </div>
    </div>
  );
}
