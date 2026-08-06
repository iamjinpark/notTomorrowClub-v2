import { useState } from "react";

import directionDownIcon from "@/assets/icon/direction-down.svg";
import BorderBtn from "../BorderBtn";
import ModalCloseButton from "./ModalCloseButton";
import type { Notice } from "@/types/notice";

interface NoticeDetailModalContentProps {
  onClose: () => void;
  notice: Notice;
  onSave?: () => void;
}

// 시안(Figma 94:2297 / 94:2361) 실측 — 780x426(운영자 494), 배경 gray6,
// 패딩 pt 52 / px 115 / pb 60(운영자 47), 본문 영역 548x255.
export default function NoticeDetailModalContent({
  onClose,
  notice,
  onSave,
}: NoticeDetailModalContentProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray6 relative flex w-[780px] flex-col items-center gap-[35px] px-[115px] pt-[52px] ${onSave ? "pb-[47px]" : "pb-[60px]"}`}
    >
      <ModalCloseButton onClose={onClose} />

      <p className="en-title-md text-black">Notice</p>

      <div className="flex h-[255px] w-[548px] flex-col gap-5">
        <div className="show-scrollbar [&::-webkit-scrollbar-track]:bg-white flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pr-[24px]">
          <div className="flex flex-col gap-[15px]">
            <div className="bg-gray5 h-[0.6px] w-full" />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              className="flex items-center justify-between"
            >
              <span className="en-button-2 text-black">{notice.title}</span>
              <img
                src={directionDownIcon}
                alt=""
                className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {isOpen && (
            <p className="ko-caption-1 text-black whitespace-pre-line">
              {notice.body}
            </p>
          )}
        </div>

        {/* 본문이 길어도 작성자·날짜는 영역 하단에 고정 */}
        <div className="flex flex-col gap-2 pr-[24px]">
          <div className="bg-gray5 h-[0.6px] w-full" />
          <div className="ko-caption-2 text-black flex items-center justify-between">
            <span>From. {notice.author}</span>
            <span>{notice.date}</span>
          </div>
        </div>
      </div>

      {onSave && (
        <BorderBtn
          text="Save"
          bg="bg-black text-white hover:bg-black"
          px="px-[1.875rem]"
          py="py-[0.8125rem]"
          className="en-button-1 leading-none"
          onClick={onSave}
        />
      )}
    </div>
  );
}
