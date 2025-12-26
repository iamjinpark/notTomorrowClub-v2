import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import StepIndicator from "./StepIndicator";
import StepCard from "./StepCard";
import { STEP_DATA } from "@/api/dummyData";

const MAX_STEP = 5;

export default function FunnelContainer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStep = Number(searchParams.get("step")) || 1;
  const [step, setStep] = useState(initialStep);
  const [stepPhase, setStepPhase] = useState("intro");
  const scrollRef = useRef(null);

  useEffect(() => {
    setSearchParams({ step });
  }, [step, setSearchParams]);

  useEffect(() => {
    if (step < 1) setStep(1);
    if (step > MAX_STEP) setStep(MAX_STEP);
  }, [step]);

  useEffect(() => {
    setStepPhase("intro");
  }, [step]);

  const goNext = () => {
    setStep((prev) => prev + 1);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
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
        <StepIndicator step={step} />
      </div>

      {/*  change the sentence */}
      <div
        ref={scrollRef}
        className="mt-[1.125rem] h-[30.125rem] border-y border-gray1 overflow-y-auto relative"
      >
        <div className="relative">
          {step >= 1 && step <= 5 && (
            <StepCard
              ko={STEP_DATA[step - 1].ko}
              en={STEP_DATA[step - 1].en}
              scrollRef={scrollRef}
              onNext={goNext}
              onPhaseChange={setStepPhase}
            />
          )}

          {/* 스크롤을 위한 추가 공간 */}
          <div className="h-[30.125rem]"></div>
        </div>
      </div>
    </div>
  );
}
