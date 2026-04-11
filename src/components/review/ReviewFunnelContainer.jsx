import ReviewStart from "./ReviewStart";
import ReviewCard from "./ReviewCard";
import ReviewWords from "./ReviewWords";
import ReviewWordsForCapture from "./ReviewWordsForCapture";

import { useRef } from "react";

export default function ReviewFunnelContainer({
  step,
  isReviewStart,
  isReviewStep,
  isReviewWords,
  learningData,
  onTimerComplete,
}) {
  const exportRef = useRef(null);
  const item = learningData?.[step - 1];

  const allWords = learningData.reduce((acc, s) => {
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
      <div className="mt-[1.125rem] h-[60vh] min-h-[20rem] max-h-[30rem] border-y-[0.6px] border-gray1 overflow-y-auto">
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
