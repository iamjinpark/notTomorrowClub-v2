import ReviewCounter from "./ReviewCounter";

function ReviewCard({ item, onNext, currentStep }) {
  return (
    <div className="pt-[150px] flex flex-col items-center gap-[7.438rem] text-center">
      <div className="flex flex-col gap-[0.938rem]">
        <p className="ko-headline-xl leading-[2.375rem]">{item.ko}</p>
        <p className="en-headline-lg leading-[2.625rem]">{item.en}</p>
      </div>
      <ReviewCounter key={currentStep} onComplete={onNext} />
    </div>
  );
}

export default ReviewCard;
ReviewCounter;
