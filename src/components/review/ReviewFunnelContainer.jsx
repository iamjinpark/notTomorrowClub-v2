import ReviewStart from "./ReviewStart";
import ReviewCard from "./ReviewCard";
import ReviewWords from "./ReviewWords";
import StepIndicator from "../learning/StepIndicator";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const MAX_STEP = 5;

export default function ReviewFunnelContainer({ learningData }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 상태 확인
  const stepParam = searchParams.get("step");

  const isReviewStart = !stepParam;
  const isReviewStep = stepParam && stepParam !== "words";
  const isReviewWords = stepParam === "words";

  const stepNumber = isReviewStep ? Number(stepParam) : isReviewWords ? 5 : 1;
  const step = Math.min(Math.max(stepNumber, 1), MAX_STEP);
  const item = learningData?.[step - 1];

  // 다음 스텝으로 이동
  const goToStep = (newStep) => {
    if (newStep >= 1 && newStep <= MAX_STEP) {
      setSearchParams({ step: String(newStep) });
    } else if (newStep > MAX_STEP) {
      setSearchParams({ step: "words" });
    }
  };

  useEffect(() => {
    console.log("stepParam:", stepParam);
  }, [stepParam]);

  // 타이머 완료 시 다음 단계로
  const handleTimerComplete = () => {
    console.log("timer complete, current step:", step);
    if (step < MAX_STEP) goToStep(step + 1);
    else setSearchParams({ step: "words" });
  };

  return (
    <div>
      <div className="flex flex-row items-start justify-between">
        <div>
          <h1 className="en-title-xl leading-[2.25rem]">
            Hello, Stranger! Good Morning
          </h1>
          <p className="ko-headline-lg text-gray3 mt-[0.563rem]">
            {isReviewWords
              ? "오늘 배운 단어들을 확인하고 오늘을 마무리해요."
              : "공부한 문장을 3초 동안 다시 확인해보세요."}
          </p>
        </div>
        <StepIndicator step={step} onStepChange={goToStep} />
      </div>
      <div className="mt-[1.125rem] h-[60vh] min-h-[20rem] max-h-[30rem] border-y border-gray1 overflow-y-auto relative">
        {isReviewStart && <ReviewStart />}
        {isReviewStep && item && (
          <ReviewCard
            item={item}
            currentStep={step}
            onNext={handleTimerComplete}
          />
        )}
        {isReviewWords && <ReviewWords learningData={learningData} />}
      </div>
    </div>
  );
}
