import LearningCard from "./LearningCard";

import { useEffect, useRef } from "react";

export default function LearningFunnelContainer({
  step,
  stepPhase,
  onStepPhaseChange,
  onScrollProgress,
  isLoggedIn,
  learningData,
  goNext,
}) {
  const scrollRef = useRef(null);
  const item = learningData?.[step - 1];

  useEffect(() => {
    onStepPhaseChange("intro");
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <div
      ref={scrollRef}
      className="mt-[1.125rem] h-[60vh] min-h-[20rem] max-h-[30rem] border-y-[0.6px] border-gray1 overflow-y-auto overscroll-y-none relative"
    >
      <div className="relative">
        {item && (
          <div>
            <LearningCard
              scrollRef={scrollRef}
              ko={item.ko}
              en={item.en}
              words={item.words}
              onNext={goNext}
              onPhaseChange={onStepPhaseChange}
              onScrollProgress={onScrollProgress}
              isLoggedIn={isLoggedIn}
              currentStep={step}
            />
            {/* 스크롤을 위한 추가 공간 */}
            <div className="h-[60vh] min-h-[20rem] max-h-[30rem]"></div>
          </div>
        )}
      </div>
    </div>
  );
}
