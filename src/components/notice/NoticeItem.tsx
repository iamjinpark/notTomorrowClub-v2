import directionRightIcon from "@/assets/icon/direction-right.svg";
import type { Notice } from "@/types/notice";

interface NoticeItemProps {
  notice: Notice;
  onClick: (notice: Notice) => void;
}

// 시안(Figma 94:2216) 실측 — 행 높이 53px, 하단 구분선, chevron 16px.
export default function NoticeItem({ notice, onClick }: NoticeItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onClick(notice)}
        className="border-gray5 hover:bg-gray6 flex h-[53px] w-full items-center justify-between border-b transition-colors"
      >
        <span className="ko-headline-sm text-black">{notice.title}</span>
        <img src={directionRightIcon} alt="" className="size-4" />
      </button>
    </li>
  );
}
