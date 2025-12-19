import messageDelete from "@/assets/img/delete_sm.svg";
// import loading from "@/assets/img/loading.svg";
import { cheerUpMessages } from "@/api/dummyData";

import { useState, useEffect } from "react";

function CherrUpMessage() {
  const [visibleMessage, setVisibleMessage] = useState([]); // 원본메세지
  const [currentIndex, setCurrentIndex] = useState(0); // 실제 렌더링되는 메세지

  // 3초마다 한개씩 메세지 추가
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = currentIndex % cheerUpMessages.length;

      setVisibleMessage((prev) => {
        const next = [...prev, cheerUpMessages[nextIndex]];
        return next.slice(-6);
      });

      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // 메세지 박스 배경 랜덤
  const getBgById = (id) => (id % 2 === 0 ? "bg-yellow" : "bg-lightgrey");

  return (
    <div className="relative top-full mt-[4rem] flex flex-col gap-4">
      {/* message box */}
      <div className="relative h-[12.5rem] overflow-hidden">
        {/* fade mask */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-42
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
                <button className="w-[0.563rem] h-[0.563rem]">
                  <img src={messageDelete} alt="delete message" />
                </button>
                <span className="text-charcoal/50">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* input */}
      <div className="flex flex-col items-start gap-[1.313rem]">
        <div className="flex flex-row gap-2">
          <button className="w-[2.313rem] h-[2rem] bg-lightgrey" />
          <div className="h-[2rem] px-[0.5rem] py-[0.313rem] bg-lightgrey flex">
            <input
              id="cheerUp"
              type="text"
              maxLength={40}
              placeholder="40 characters or fewer"
              className="w-[11.063rem] h-full bg-white text-xs px-[0.313rem] outline-none"
            />
            <button className="text-xs pl-[0.563rem] h-full">send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CherrUpMessage;
