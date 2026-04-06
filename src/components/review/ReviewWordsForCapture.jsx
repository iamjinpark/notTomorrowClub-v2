import wordIcon from "@/assets/img/wordIcon.svg";

function ReviewWordsForCapture({ ref, allWords }) {
  return (
    <div
      className="fixed left-[-9999px] top-0"
    >
      <div
        ref={ref}
        className="bg-lightyellow flex items-center justify-center w-[1080px] h-[1350px] py-[315px] px-[290px]"
      >
        <div className="flex flex-col items-start gap-[20px]">
          {allWords.map((word, index) => (
            <div key={index} className="flex items-center gap-[16px]">
              <img src={wordIcon} alt="" className="w-[10px] h-[10px] shrink-0" />
              <div className="flex items-baseline gap-[20px]">
                <span className="font-roboto font-normal text-[40px] leading-[125%] whitespace-nowrap">
                  {word.en}
                </span>
                <span className="font-pretendard font-medium text-[34px] leading-[100%] whitespace-nowrap">
                  {word.ko}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewWordsForCapture;
