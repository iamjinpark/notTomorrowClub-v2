import { useSearchParams } from "react-router-dom";
import ReviewFunnelContainer from "@/components/review/ReviewFunnelContainer";
import StepIndicator from "@/components/learning/StepIndicator";
import PageHeader from "@/layouts/PageHeader";
import { useLearningData } from "@/context/LearningDataContext";
import { MAX_STEP } from "@/constants";

function Review() {
  const reviewData = useLearningData();
  const [searchParams, setSearchParams] = useSearchParams();

  const stepParam = searchParams.get("step");
  const isReviewStart = !stepParam;
  const isReviewStep = stepParam && stepParam !== "words";
  const isReviewWords = stepParam === "words";

  const stepNumber = isReviewStep ? Number(stepParam) : isReviewWords ? 5 : 1;
  const step = Math.min(Math.max(stepNumber, 1), MAX_STEP);

  const goToStep = (newStep) => {
    if (newStep >= 1 && newStep <= MAX_STEP) {
      setSearchParams({ step: String(newStep) });
    } else if (newStep > MAX_STEP) {
      setSearchParams({ step: "words" });
    }
  };

  const handleTimerComplete = () => {
    if (step < MAX_STEP) goToStep(step + 1);
    else setSearchParams({ step: "words" });
  };

  const subtitle = isReviewWords
    ? "오늘 배운 단어들을 확인하고 오늘을 마무리해요."
    : "공부한 문장을 5초 동안 다시 확인해보세요.";

  return (
    <div className="relative">
      <PageHeader title="Hello, Stranger! Good Morning" subtitle={subtitle}>
        <StepIndicator step={step} onStepChange={goToStep} />
      </PageHeader>
      <ReviewFunnelContainer
        step={step}
        isReviewStart={isReviewStart}
        isReviewStep={!!isReviewStep}
        isReviewWords={isReviewWords}
        learningData={reviewData}
        onTimerComplete={handleTimerComplete}
      />
    </div>
  );
}

export default Review;
