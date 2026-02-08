import messageDelete from "@/assets/img/delete_sm.svg";
import { cheerUpMessages } from "@/api/dummyData";
import TypingIndicator from "./TypingIndicator";

import { useState, useEffect } from "react";

function CherrUpMessage() {
  // TODO: 추후 전역 상태나 context에서 가져올 현재 로그인한 사용자 ID
  const currentUserId = "user123";

  const [visibleMessage, setVisibleMessage] = useState([]); // 원본메세지
  const [currentIndex, setCurrentIndex] = useState(0); // 실제 렌더링되는 메세지
  const [isTyping, setIsTyping] = useState(false); // 타이핑 애니메이션

  // 3초마다 한개씩 메세지 추가
  useEffect(() => {
    let typingTimer;
    let messageTimer;

    typingTimer = setTimeout(() => {
      setIsTyping(true);
    }, 1800);

    typingTimer = setTimeout(() => {
      setIsTyping(false);

      messageTimer = setTimeout(() => {
        const nextIndex = currentIndex % cheerUpMessages.length;

        setVisibleMessage((prev) => {
          const next = [...prev, cheerUpMessages[nextIndex]];
          return next.slice(-6);
        });

        setCurrentIndex((prev) => prev + 1);
      }, 150); // typing → message
    }, 3500); // typing

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(messageTimer);
    };
  }, [currentIndex]);

  const getBgById = (id) => (id % 2 === 0 ? "bg-yellow" : "bg-gray5");

  return (
    <div className="relative top-full flex flex-col gap-4 w-[16.25rem]">
      {/* message box */}
      <div className="relative h-50 overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28
          bg-linear-to-b from-white to-transparent z-10"
        />

        {/* message stack */}
        <div className="flex flex-col items-start gap-3 justify-end h-full">
          {visibleMessage.map((message) => (
            <div
              key={message.id}
              className={`message inline-flex max-w-65
              min-h-12.5 px-2.5 py-2
              text-xs font-roboto  ${getBgById(message.id)}`}
            >
              <p className="inline-block max-w-44 leading-4 break-all box-border">
                {message.text}
              </p>

              <div className="flex flex-col items-end justify-between ml-3">
                {message.authorId === currentUserId && (
                  <button className="w-[0.563rem] h-[0.563rem]">
                    <img src={messageDelete} alt="delete message" />
                  </button>
                )}
                {message.authorId !== currentUserId && (
                  <div className="w-[0.563rem] h-[0.563rem]" />
                )}
                <span className="text-charcoal/50">{message.time}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div>
              <TypingIndicator />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CherrUpMessage;
