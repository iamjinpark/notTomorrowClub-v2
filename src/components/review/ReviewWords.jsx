import Modal from "@/components/common/Modal/Modal";
import wordIcon from "@/assets/img/wordIcon.svg";
import downloadIcon from "@/assets/img/downloadIcon.svg";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLearningData } from "@/api/learning";
import { useModal } from "@/hooks/useModal";

function ReviewWords() {
  const navigate = useNavigate();
  const [learningData, setLearningData] = useState([]);
  const learningModal = useModal();

  useEffect(() => {
    const loadLearningData = async () => {
      try {
        const data = await fetchLearningData();
        setLearningData(data);
      } catch (error) {
        console.error("Failed to load learning data:", error);
      }
    };

    loadLearningData();
  }, []);

  const handleGotItClick = () => {
    learningModal.open();
  };

  // step 1~5의 모든 단어 수집
  const allWords = learningData.reduce((acc, step) => {
    if (step.words && step.words.length > 0) {
      return [...acc, ...step.words];
    }
    return acc;
  }, []);

  return (
    <div className="pt-[1.938rem] flex flex-col items-center text-center">
      <div className="w-full flex justify-end">
        <button className="en-body-sm text-gray3 flex items-center gap-[0.625rem]">
          voca Img Download
          <img
            src={downloadIcon}
            alt="Word Icon"
            className="w-[1.188rem] h-[1.25rem]"
          />
        </button>
      </div>
      {allWords && allWords.length > 0 && (
        <div className="pt-[1.938rem] grid grid-cols-2 gap-x-[3.75rem] gap-y-[1.125rem]">
          {allWords.map((word, index) => (
            <div key={index} className="flex items-center gap-[0.5rem]">
              <img src={wordIcon} alt="" className="w-[9.68px] h-[9.93px]" />
              <div className="flex items-baseline gap-2 leading-none">
                <span className="en-body-md leading-none">{word.en}</span>
                <span className="ko-headline-sm leading-none">{word.ko}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleGotItClick}
        className="mt-[3.75rem] px-[1.563rem] py-[0.813rem] font-roboto rounded-[2.5rem] border border-black text-[1.25rem] leading-[1.25rem] hover:bg-lightyellow"
      >
        Got it
      </button>

      <Modal
        type="learning"
        isOpen={learningModal.isOpen}
        onClose={() => learningModal.close()}
      />
    </div>
  );
}

export default ReviewWords;
