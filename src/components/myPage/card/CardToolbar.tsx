import downloadIcon from "@/assets/icon/download.svg";
import printIcon from "@/assets/icon/print-1.svg";
import shareIcon from "@/assets/icon/share.svg";
import searchIcon from "@/assets/icon/search.svg";
import arrowsOutIcon from "@/assets/icon/arrows-out.svg";

interface CardToolbarProps {
  onDownload?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onExpand?: () => void;
}

// 시안(Figma 86:67) 실측 — 32x32 아이콘 6개, 간격 10px, 프레임 우상단 (1399, 11).
// 아이콘 색은 #e8e8e8(gray6)이다. 프로젝트 SVG는 fill="black"이라 invert로는
// 순백이 되므로 mask로 칠한다.
export default function CardToolbar({
  onDownload,
  onPrint,
  onShare,
  onZoomIn,
  onZoomOut,
  onExpand,
}: CardToolbarProps) {
  const items = [
    { icon: downloadIcon, label: "카드 이미지 다운로드", onClick: onDownload },
    { icon: printIcon, label: "카드 인쇄", onClick: onPrint },
    { icon: shareIcon, label: "카드 공유", onClick: onShare },
    { icon: searchIcon, label: "확대", onClick: onZoomIn },
    { icon: searchIcon, label: "축소", onClick: onZoomOut },
    { icon: arrowsOutIcon, label: "전체 화면으로 보기", onClick: onExpand },
  ];

  // 시안은 데스크톱만 있다. 좁은 화면에서는 문서가 폭을 가득 채워 우상단 툴바가
  // 문서를 가리므로 하단 중앙 가로 배치로 내린다.
  return (
    <div className="fixed bottom-[1rem] left-1/2 z-10 flex -translate-x-1/2 gap-[0.625rem] rounded-full bg-black/40 px-[0.75rem] py-[0.5rem] lg:top-[0.6875rem] lg:right-[0.5625rem] lg:bottom-auto lg:left-auto lg:translate-x-0 lg:flex-col lg:rounded-none lg:bg-transparent lg:p-0 print:hidden">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          aria-label={item.label}
          onClick={item.onClick}
          className="bg-gray6 size-[2rem] transition-opacity hover:opacity-70"
          style={{
            // Vite가 SVG를 data URI로 인라인하고 그 안에 ' 와 , 가 있어서
            // 따옴표 없는 url()은 브라우저가 거부한다. 반드시 감싼다.
            maskImage: `url("${item.icon}")`,
            WebkitMaskImage: `url("${item.icon}")`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      ))}
    </div>
  );
}
