import wordIcon from "@/assets/img/wordIcon.svg";

function ReviewWordsForCapture({ ref, allWords }) {
  return (
    <div className="fixed left-[-9999px] top-0" ref={ref}>
      <div className="bg-white w-[1120px] h-[482px]">
        <div className="pt-[3.125rem] flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <p className="en-title-lg">Today's Vocabulary</p>
            <p className="ko-caption-1 text-gray3">
              {new Date().toISOString().slice(0, 10).replace(/-/g, "/")}
            </p>
          </div>
          <div className="pt-[3.125rem] grid grid-cols-2 gap-x-[3.75rem] gap-y-[1.125rem]">
            {allWords.map((word, index) => (
              <div key={index} className="flex items-center gap-[0.5rem]">
                <img src={wordIcon} alt="" className="w-[9.68px] h-[9.93px]" />
                <div className="flex items-baseline gap-[0.875rem] leading-none">
                  <span className="en-body-md leading-none">{word.en}</span>
                  <span className="ko-headline-sm leading-none">{word.ko}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewWordsForCapture;
