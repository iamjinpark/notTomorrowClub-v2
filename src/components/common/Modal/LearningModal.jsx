import BorderBtn from "../BorderBtn";
import closeIcon from "@/assets/img/closeIcon.svg";

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
    <div className="relative w-176.5 bg-lightyellow py-[3.438rem] flex flex-col items-center gap-[2.813rem]">
      <button onClick={onClose} className="absolute -top-10 right-0">
        <img src={closeIcon} alt="Close Icon" className="w-8.75 h-8.75" />
      </button>
      <p className="en-title-lg">Finished reading Today's sentences!</p>
      <div className="flex flex-col items-center gap-2.5">
        <BorderBtn
          text="Go to review"
          py="py-[0.813rem]"
          bg="bg-white"
          className="w-63.5 font-roboto text-[1.25rem] leading-5"
          onClick={handleReadAgain}
        />
        <BorderBtn
          text="Go to make it"
          py="py-[0.813rem]"
          bg="bg-white"
          className="w-63.5 font-roboto text-[1.25rem] leading-5"
          onClick={handleGoToMakeIT}
        />
        <BorderBtn
          text="Finished for today"
          py="py-[0.813rem]"
          bg="bg-black"
          className="w-63.5 text-white border-black font-roboto text-[1.25rem] leading-5 hover:text-black"
          onClick={handleFinished}
        />
      </div>
    </div>
  );
}

export default LearningModal;
