import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLearningData } from "@/api/learning";
import Modal from "@/components/common/Modal/Modal";
import { useModal } from "@/hooks/useModal";
import wordIcon from "@/assets/img/wordIcon.svg";

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
    <div className="pt-[150px] flex flex-col items-center gap-[7.438rem] text-center">
      <div className="flex flex-col gap-[2.125rem] items-center">
        <h1 className="ko-headline-xl">모든 단어</h1>
        {allWords && allWords.length > 0 && (
          <div className="flex gap-[2.75rem] items-center mt-8 flex-wrap justify-center">
            {allWords.map((word, index) => (
              <div key={index} className="flex items-center gap-[0.3rem]">
                <img src={wordIcon} alt="" className="w-[9.68px] h-[9.93px]" />
                <div className="flex items-baseline gap-2 leading-none">
                  <span className="en-body-md leading-none">{word.en}</span>
                  <span className="ko-headline-sm leading-none">{word.ko}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleGotItClick}
        className="px-[1.563rem] py-[0.813rem] font-roboto rounded-[2.5rem] border border-black text-[1.25rem] leading-[1.25rem] hover:bg-lightyellow"
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
