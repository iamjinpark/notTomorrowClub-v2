import StepIndicator from "./StepIndicator";
import StepCard from "./StepCard";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const MAX_STEP = 5;

export default function FunnelContainer({
  onScrollProgress,
  isLoggedIn,
  learningData,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollRef = useRef(null);

  const [stepPhase, setStepPhase] = useState("intro");
  const stepFromUrl = Number(searchParams.get("step")) || 1;
  const step = Math.min(Math.max(stepFromUrl, 1), MAX_STEP);
  const item = learningData?.[step - 1];

  const resetScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    setStepPhase("intro");
    resetScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // 버튼으로 이동
  const goNext = () => {
    const next = Math.min(step + 1, MAX_STEP);
    setSearchParams({ step: next });
  };

  // 인디케이터로 이동
  const goToStep = (targetStep) => {
    if (targetStep > step + 1) return;

    setSearchParams({ step: targetStep });
  };

  return (
    <div>
      <div className="flex flex-row items-start justify-between">
        <div className="font-chakra">
          <h1 className="text-[2.25rem] font-semibold leading-[49px] h-[1.813rem]">
            Hello, Stranger! Good Morning
          </h1>
          <p className="text-[1.5rem] text-gray3 font-mendium leading-[28px] mt-[1.125rem]">
            {stepPhase === "intro" && (
              <>Guess the English sentence from Korean!</>
            )}
            {stepPhase === "reveal" && <>Check the English sentence below</>}
          </p>
        </div>
        <StepIndicator step={step} onStepChange={goToStep} />
      </div>

      <div
        ref={scrollRef}
        className="mt-[1.125rem] h-[60vh] min-h-[20rem] max-h-[30rem] border-y border-gray1 overflow-y-auto relative"
      >
        <div className="relative">
          {item && (
            <StepCard
              scrollRef={scrollRef}
              ko={item.ko}
              en={item.en}
              words={item.words}
              onNext={goNext}
              onPhaseChange={setStepPhase}
              onScrollProgress={onScrollProgress}
              isLoggedIn={isLoggedIn}
              currentStep={step}
            />
          )}

          {/* 스크롤을 위한 추가 공간 */}
          <div className="h-[60vh] min-h-[20rem] max-h-[30rem]"></div>
        </div>
      </div>
    </div>
  );
}
