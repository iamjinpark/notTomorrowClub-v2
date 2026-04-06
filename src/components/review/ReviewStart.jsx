import { useNavigate } from "react-router-dom";
import BorderBtn from "@/components/common/BorderBtn";

function ReviewStart() {
  const navigate = useNavigate();

  const handleStartReview = () => {
    navigate("/review?step=1");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[96px] pt-[127px]">
      <div className="font-pretendard text-center">
        <div className="flex flex-col gap-[7px] mb-[20px]">
          <p className="h-[42px] en-headline-lg">
            Review the sentence you studied
          </p>
          <p className="h-[42px] en-headline-lg">for 5 seconds</p>
        </div>
        <p className="h-[24px] ko-headline-lg text-gray3">
          English and Korean sentence will be displayed together
        </p>
      </div>

      <BorderBtn
        text="start"
        py="py-[0.813rem]"
        px="px-[1.688rem]"
        className="font-roboto text-[1.25rem] leading-[1.25rem]"
        onClick={handleStartReview}
      />
    </div>
  );
}

export default ReviewStart;
