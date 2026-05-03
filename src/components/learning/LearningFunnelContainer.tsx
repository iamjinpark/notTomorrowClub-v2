import LearningCard from "./LearningCard";

import { useEffect, useRef } from "react";
import type { StepData } from "@/types";

type LearningPhase = "intro" | "reveal";

interface LearningFunnelContainerProps {
  step: number;
  stepPhase: LearningPhase;
  onStepPhaseChange: (phase: LearningPhase) => void;
  onScrollProgress: (progress: number) => void;
  isLoggedIn: boolean;
  learningData: StepData[];
  goNext: () => void;
}

export default function LearningFunnelContainer({
  step,
  onStepPhaseChange,
  onScrollProgress,
  isLoggedIn,
  learningData,
  goNext,
}: LearningFunnelContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const item = learningData?.[step - 1];

  useEffect(() => {
    onStepPhaseChange("intro");
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <div
      ref={scrollRef}
      className="border-gray1 relative h-[60vh] max-h-[30rem] min-h-[20rem] overflow-y-auto overscroll-y-none border-y-[0.6px]"
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
            <div className="h-[60vh] max-h-[30rem] min-h-[20rem]"></div>
          </div>
        )}
      </div>
    </div>
  );
}
