import BorderBtn from "../BorderBtn";
import closeIcon from "@/assets/img/closeIcon.svg";

import { useNavigate } from "react-router-dom";

interface LearningModalProps {
  onClose: () => void;
}

function LearningModal({ onClose }: LearningModalProps) {
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
    <div className="bg-lightyellow relative flex w-176.5 flex-col items-center gap-[2.813rem] py-[3.438rem]">
      <button onClick={onClose} className="absolute -top-10 right-0">
        <img src={closeIcon} alt="Close Icon" className="h-8.75 w-8.75" />
      </button>
      <p className="en-title-lg">Finished reading Today&apos;s sentences!</p>
      <div className="flex flex-col items-center gap-2.5">
        <BorderBtn
          text="Finished today's study"
          py="py-[0.813rem]"
          bg="bg-white"
          className="font-roboto w-63.5 text-[1.25rem] leading-5 hover:text-black"
          onClick={handleFinished}
        />
        <BorderBtn
          text="Go read again"
          py="py-[0.813rem]"
          bg="bg-white"
          className="font-roboto w-63.5 text-[1.25rem] leading-5"
          onClick={handleReadAgain}
        />
        <BorderBtn
          text="Go make it page"
          py="py-[0.813rem]"
          bg="bg-black"
          className="font-roboto w-63.5 border-black text-[1.25rem] leading-5 text-white"
          onClick={handleGoToMakeIT}
        />
      </div>
    </div>
  );
}

export default LearningModal;
