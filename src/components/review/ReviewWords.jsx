import Modal from "@/components/common/Modal/Modal";
import wordIcon from "@/assets/img/wordIcon.svg";
import downloadIcon from "@/assets/img/downloadIcon.svg";

import { useState } from "react";
import { useModal } from "@/hooks/useModal";

function ReviewWords({ allWords, onDownload }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const learningModal = useModal();

  const handleDownloadClick = async () => {
    setIsCapturing(true);

    // DOM 업데이트 기다리기
    await new Promise((resolve) => requestAnimationFrame(resolve));

    await onDownload?.();

    setIsCapturing(false);
  };

  const handleGotItClick = () => {
    learningModal.open();
  };

  return (
    <div className="pt-[1.938rem] flex flex-col items-center text-center">
      {isCapturing && (
        <div className="w-full flex justify-center mb-6">
          <div className="text-center">
            <p className="en-title-lg">Today’s Vocabulary</p>
            <p className="ko-caption-1 text-gray3">
              {new Date().toISOString().slice(0, 10).replace(/-/g, "/")}
            </p>
          </div>
        </div>
      )}

      {!isCapturing && (
        <div className="w-full flex justify-end">
          <button
            onClick={handleDownloadClick}
            className="en-body-sm text-gray3 flex items-center gap-[0.625rem] hover:text-black transition-colors"
          >
            Voca Img Download
            <img
              src={downloadIcon}
              alt="단어 다운받기"
              className="w-[1.188rem] h-[1.25rem]"
            />
          </button>
        </div>
      )}

      {allWords.length > 0 && (
        <div className="pt-[1.938rem] grid grid-cols-2 gap-x-[3.75rem] gap-y-[1.125rem]">
          {allWords.map((word, index) => (
            <div key={index} className="flex items-center gap-[0.5rem]">
              <img src={wordIcon} alt="" className="w-[9.68px] h-[9.93px]" />
              <div className="flex items-baseline gap-[0.875rem] leading-none">
                <span className="en-body-md leading-none">{word.en}</span>
                <span className="ko-headline-sm leading-none">{word.ko}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isCapturing && (
        <button
          onClick={handleGotItClick}
          className="mt-[3.75rem] px-[1.563rem] py-[0.813rem] font-roboto rounded-[2.5rem] border border-black text-[1.25rem] leading-[1.25rem] hover:bg-lightyellow"
          data-html2canvas-ignore
        >
          Got it
        </button>
      )}

      <Modal
        type="learning"
        isOpen={learningModal.isOpen}
        onClose={() => learningModal.close()}
      />
    </div>
  );
}

export default ReviewWords;
