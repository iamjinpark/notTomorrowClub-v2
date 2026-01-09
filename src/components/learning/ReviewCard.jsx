import BorderBtn from "../common/BorderBtn";
import { useState } from "react";

function ReviewCard({ ko, en, words, onPhaseChange, currentStep, onNext }) {
  const [isReviewStarted, setIsReviewStarted] = useState(false);

  const handleStartReview = () => {
    setIsReviewStarted(true);
    onPhaseChange?.("review");
  };

  if (!isReviewStarted) {
    return (
      <div className="flex flex-col items-center justify-center gap-[7rem] pt-[10rem]">
        <div className="font-pretendard font-medium text-center tracking-ko-headline">
          <p className="text-ko-headline-xl">
            공부한 문장을 3초 동안 다시 확인해보세요.
          </p>
          <p className="text-ko-headline-lg text-gray3">
            총 15초 동안 플레이 됩니다.
          </p>
        </div>

        <BorderBtn
          text="start"
          py="py-[0.813rem]"
          px="px-[1.688rem]"
          className="font-roboto text-[1.25rem] leading-[1.25rem]"
          onClick={handleStartReview}
        />
      </div>
    );
  }

  return <div>복습중....</div>;
}

export default ReviewCard;
