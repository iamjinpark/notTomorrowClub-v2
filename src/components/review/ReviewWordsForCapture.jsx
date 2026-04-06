import wordIcon from "@/assets/img/wordIcon.svg";

function ReviewWordsForCapture({ ref, allWords }) {
  return (
    <div className="fixed left-0 top-0 z-50 overflow-auto" ref={ref}>
      <div className="bg-lightyellow flex items-center justify-center w-[1080px] h-[1350px] py-[315px] px-[290px]">
        <div className="h-full ₩flex flex-col items-start">
          {allWords.map((word, index) => (
            <div key={index} className="flex items-center gap-[20px]">
              <img
                src={wordIcon}
                alt=""
                className="w-[14px] h-[14px] shrink-0"
              />
              <div className="flex items-baseline gap-[28px]">
                <span className="font-roboto font-normal text-[52px] leading-[125%]">
                  {word.en}
                </span>
                <span className="font-pretendard font-medium text-[45px] leading-[100%]">
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
