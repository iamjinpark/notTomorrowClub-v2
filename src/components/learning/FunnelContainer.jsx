import StepIndicator from "./StepIndicator";
import StepCard from "./StepCard";
import { STEP_DATA } from "@/api/dummyData";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchLearningData } from "@/api/learning";

export default function FunnelContainer({ onScrollProgress, isLoggedIn }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStep = Number(searchParams.get("step")) || 1;
  const [step, setStep] = useState(initialStep);
  const [stepPhase, setStepPhase] = useState("intro");
  const scrollRef = useRef(null);

  const [learningData, setLearningData] = useState([]);
  const item = learningData?.[step - 1];

  // 학습 데이터 불러오기
  useEffect(() => {
    const loadLearningData = async () => {
      try {
        const data = await fetchLearningData();
        setLearningData(data);
      } catch (error) {
        console.error("Failed to load learning data:", error);
      }
    };

    loadLearningData();
  }, []);

  // url & step 동기화
  useEffect(() => {
    const urlStep = Number(searchParams.get("step")) || 1;
    setStep(urlStep);
  }, [searchParams]);

  useEffect(() => {
    if (step < 1) setStep(1);
    if (step > 5) setStep(5);
  }, [step]);

  useEffect(() => {
    setStepPhase("intro");
  }, [step]);

  const goNext = () => {
    const next = Math.min(step + 1, 5);
    setStep(next);
    setSearchParams({ step: next });

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const goToStep = (targetStep) => {
    if (targetStep > step + 1) return;

    setSearchParams({ step: targetStep });

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
        <StepIndicator step={step} onStepChange={goToStep} />
      </div>

      <div
        ref={scrollRef}
        className="mt-[1.125rem] h-[30.125rem] border-y border-gray1 overflow-y-auto relative"
      >
        <div className="relative">
          {step >= 1 && step <= 5 && item && (
            <StepCard
              ko={item?.ko}
              en={item?.en}
              scrollRef={scrollRef}
              onNext={goNext}
              onPhaseChange={setStepPhase}
              words={item?.words}
              onScrollProgress={onScrollProgress}
              isLoggedIn={isLoggedIn}
            />
          )}

          {/* 스크롤을 위한 추가 공간 */}
          <div className="h-[30.125rem]"></div>
        </div>
      </div>
    </div>
  );
}
