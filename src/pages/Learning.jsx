import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LearningFunnelContainer from "@/components/learning/LearningFunnelContainer";
import LoginRequiredOverlay from "@/components/learning/LoginRequiredOverlay";
import StepIndicator from "@/components/learning/StepIndicator";
import PageHeader from "@/layouts/PageHeader";
import { useLearningData } from "@/context/LearningDataContext";
import { SCROLL_REVEAL_THRESHOLD, MAX_STEP } from "@/constants";

function Learning() {
  const navigate = useNavigate();
  const learningData = useLearningData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO : 로그인 로직 구현 후 false로 변경
  const [stepPhase, setStepPhase] = useState("intro");

  const stepFromUrl = Number(searchParams.get("step")) || 1;
  const step = Math.min(Math.max(stepFromUrl, 1), MAX_STEP);

  const goToStep = (targetStep) => {
    if (targetStep > step + 1) return;
    setSearchParams({ step: targetStep });
  };

  const goNext = () => {
    const next = Math.min(step + 1, MAX_STEP);
    setSearchParams({ step: next });
  };

  const subtitle =
    stepPhase === "intro"
      ? "한국어 문장을 보면서 영어 문장을 생각해보세요."
      : "두 문장을 함께 보면서 스스로 맞는지 확인해보세요.";

  const showOverlay = !isLoggedIn && scrollProgress > SCROLL_REVEAL_THRESHOLD;

  return (
    <div className="relative">
      <PageHeader title="Hello, Stranger! Good Morning" subtitle={subtitle}>
        <StepIndicator step={step} onStepChange={goToStep} />
      </PageHeader>
      <LearningFunnelContainer
        step={step}
        stepPhase={stepPhase}
        onStepPhaseChange={setStepPhase}
        onScrollProgress={setScrollProgress}
        isLoggedIn={isLoggedIn}
        learningData={learningData}
        goNext={goNext}
      />
      {showOverlay && <LoginRequiredOverlay goLogin={() => navigate("/login")} />}
    </div>
  );
}

export default Learning;
