import { useNavigate } from "react-router-dom";
import BorderBtn from "@/components/common/BorderBtn";

function ReviewStart() {
  const navigate = useNavigate();

  const handleStartReview = () => {
    navigate("/review?step=1");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-28 pt-40">
      <div className="font-pretendard font-medium text-center tracking-ko-headline">
        <p className="ko-headline-xl">
          공부한 문장을 3초 동안 다시 확인해보세요.
        </p>
        <p className="ko-headline-lg text-gray3">총 15초 동안 플레이 됩니다.</p>
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
