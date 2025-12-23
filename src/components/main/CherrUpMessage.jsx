import messageDelete from "@/assets/img/delete_sm.svg";
import { cheerUpMessages } from "@/api/dummyData";
import TypingIndicator from "./TypingIndicator";
import pointer from "@/assets/img/pointer.png";

import { useState, useEffect } from "react";

function CherrUpMessage() {
  // TODO: 추후 전역 상태나 context에서 가져올 현재 로그인한 사용자 ID
  const currentUserId = "user123";

  const [visibleMessage, setVisibleMessage] = useState([]); // 원본메세지
  const [currentIndex, setCurrentIndex] = useState(0); // 실제 렌더링되는 메세지
  const [isTyping, setIsTyping] = useState(false); // 타이핑 애니메이션
  const [isMessageActive, setIsMessageActive] = useState(false);

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

  const activeMessageInput = () => {
    setIsMessageActive((prev) => !prev);
  };

  const sendMessage = () => {
    console.log("send message");
  };

  return (
    <div className="relative top-full mt-[3.75rem] flex flex-col gap-4">
      {/* message box */}
      <div className="relative h-[12.5rem] overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28
          bg-gradient-to-b from-white to-transparent z-10"
        />

        {/* message stack */}
        <div className="flex flex-col items-start gap-3 justify-end h-full">
          {visibleMessage.map((message, index) => (
            <div
              key={message.id}
              className={`message inline-flex max-w-[16.25rem]
              min-h-[3.125rem] px-[0.625rem] py-2
              text-xs font-roboto  ${getBgById(message.id)}`}
            >
              <p className="inline-block max-w-[11rem] leading-4 break-all box-border">
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

      {/* input */}
      <div className="flex flex-col items-start gap-[1.313rem]">
        <div className="flex flex-row gap-2">
          <button
            className="w-[2.313rem] h-[2rem] cursor-pointer"
            onClick={activeMessageInput}
          >
            <img src={pointer} alt="" className="h-[85%]" />
          </button>
          {isMessageActive && (
            <div className="h-[2rem] px-[0.5rem] py-[0.313rem] bg-gray5 flex">
              <input
                id="cheerUp"
                type="text"
                maxLength={40}
                placeholder="40 characters or fewer"
                className="w-[11.063rem] h-full bg-white text-xs px-[0.313rem] outline-none"
              />
              <button
                className="text-xs pl-[0.563rem] h-full cursor-pointer"
                onClick={sendMessage}
              >
                send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CherrUpMessage;
