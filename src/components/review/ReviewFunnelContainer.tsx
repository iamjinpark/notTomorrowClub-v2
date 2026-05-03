import ReviewStart from "./ReviewStart";
import ReviewCard from "./ReviewCard";
import ReviewWords from "./ReviewWords";
import ReviewWordsForCapture from "./ReviewWordsForCapture";

import { useRef } from "react";
import type { StepData, Word } from "@/types";

interface ReviewFunnelContainerProps {
  step: number;
  isReviewStart: boolean;
  isReviewStep: boolean;
  isReviewWords: boolean;
  learningData: StepData[];
  onTimerComplete: () => void;
}

export default function ReviewFunnelContainer({
  step,
  isReviewStart,
  isReviewStep,
  isReviewWords,
  learningData,
  onTimerComplete,
}: ReviewFunnelContainerProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const item = learningData?.[step - 1];

  const allWords = learningData.reduce<Word[]>((acc, s) => {
    if (s.words && s.words.length > 0) return [...acc, ...s.words];
    return acc;
  }, []);

  const handleDownloadImage = async () => {
    if (!exportRef.current) return;

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = `vocabulary-${new Date().toISOString().split("T")[0]}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <div className="border-gray1 h-[60vh] max-h-[30rem] min-h-[20rem] overflow-y-auto border-y-[0.6px]">
        {isReviewStart && <ReviewStart />}
        {isReviewStep && item && (
          <ReviewCard item={item} currentStep={step} onNext={onTimerComplete} />
        )}
        {isReviewWords && (
          <ReviewWords allWords={allWords} onDownload={handleDownloadImage} />
        )}
      </div>
      <ReviewWordsForCapture ref={exportRef} allWords={allWords} />
    </div>
  );
}
