import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import StepIndicator from "./StepIndicator";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";

const MAX_STEP = 5;

export default function FunnelContainer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStep = Number(searchParams.get("step")) || 1;
  const [step, setStep] = useState(initialStep);
  const [step1Phase, setStep1Phase] = useState("intro");
  const scrollRef = useRef(null);

  useEffect(() => {
    setSearchParams({ step });
  }, [step, setSearchParams]);

  useEffect(() => {
    if (step < 1) setStep(1);
    if (step > MAX_STEP) setStep(MAX_STEP);
  }, [step]);

  const goNext = () => {
    setStep((prev) => prev + 1);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };
  const goPrev = () => {
    setStep((prev) => prev - 1);
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
            {step === 1 && step1Phase === "intro" && (
              <>Guess the English sentence from Korean!</>
            )}
            {step === 1 && step1Phase === "reveal" && (
              <>Check the English sentence below</>
            )}
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
          {step === 1 && (
            <Step1
              onNext={goNext}
              scrollRef={scrollRef}
              onPhaseChange={setStep1Phase}
            />
          )}
          {step === 2 && (
            <Step2 onNext={goNext} onPrev={goPrev} scrollRef={scrollRef} />
          )}
          {step === 3 && (
            <Step3 onNext={goNext} onPrev={goPrev} scrollRef={scrollRef} />
          )}
          {step === 4 && (
            <Step4 onNext={goNext} onPrev={goPrev} scrollRef={scrollRef} />
          )}
          {step === 5 && <Step5 onPrev={goPrev} scrollRef={scrollRef} />}

          {/* 스크롤을 위한 추가 공간 */}
          <div className="h-[30.125rem]"></div>
        </div>
      </div>
    </div>
  );
}
