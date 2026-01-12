import BorderBtn from "../common/BorderBtn";
import ReviewCounter from "./ReviewCounter";

import { useState } from "react";

function ReviewCard({ ko, en, words, onPhaseChange, currentStep, onNext }) {
  const handleStartReview = () => {
    setIsReviewStarted(true);
    onPhaseChange?.("review");
  };

  return (
    <div className="pt-[150px] flex flex-col items-center gap-[7.438rem] text-center">
      <div className="flex flex-col gap-[0.938rem]">
        <p className="ko-headline-xl leading-[2.375rem]">{ko}</p>
        <p className="en-headline-lg leading-[2.625rem]">{en}</p>
      </div>
      <ReviewCounter key={currentStep} onComplete={onNext} />
    </div>
  );
}

export default ReviewCard;
