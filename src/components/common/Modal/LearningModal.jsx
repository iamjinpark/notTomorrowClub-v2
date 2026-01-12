import BorderBtn from "../BorderBtn";

import { useNavigate } from "react-router-dom";

function LearningModal({ onClose }) {
  const navigate = useNavigate();

  const handleReadAgain = () => {
    navigate("/review");
    onClose();
  };

  const handleGoToMakeIT = () => {
    navigate("/make-it");
    onClose();
  };

  const handleFinished = () => {
    navigate("/");
    onClose();
  };

  return (
    <div className="w-[44.125rem] bg-lightyellow py-[3.438rem] flex flex-col items-center gap-[2.813rem]">
      <p className="en-title-lg">Finished reading Today's sentences!</p>
      <div className="flex flex-col items-center gap-[0.625rem]">
        <BorderBtn
          text="Go to review"
          py="py-[0.813rem]"
          bg="bg-white"
          className="w-[15.875rem] font-roboto text-[1.25rem] leading-[1.25rem]"
          onClick={handleReadAgain}
        />
        <BorderBtn
          text="Go to make it"
          py="py-[0.813rem]"
          bg="bg-white"
          className="w-[15.875rem] font-roboto text-[1.25rem] leading-[1.25rem]"
          onClick={handleGoToMakeIT}
        />
        <BorderBtn
          text="Finished for today"
          py="py-[0.813rem]"
          bg="bg-black"
          className="w-[15.875rem] text-white border-black font-roboto text-[1.25rem] leading-[1.25rem] hover:text-black"
          onClick={handleFinished}
        />
      </div>
    </div>
  );
}

export default LearningModal;
