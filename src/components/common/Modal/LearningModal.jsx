import closeIcon from "@/assets/img/closeIcon.svg";
import BorderBtn from "../BorderBtn";

function LearningModal() {
  return (
    <div className="flex flex-col items-end gap-[0.938rem]">
      <button>
        <img src={closeIcon} alt="Close Icon" className="bg-black" />
      </button>
      <div className="w-[44.125rem] bg-lightyellow py-[3.438rem] flex flex-col items-center gap-[2.813rem]">
        <p className="text-title-lg font-chakra font-semibold">
          Finished reading Today’s sentences!
        </p>
        <div className="flex flex-col items-center gap-[0.625rem]">
          <BorderBtn
            text="Go read again"
            py="py-[0.813rem]"
            bg="bg-white"
            className="w-[15.875rem] font-roboto text-button-lg leading-[1.25rem]"
          />
          <BorderBtn
            text="Go make it page"
            py="py-[0.813rem]"
            bg="bg-white"
            className="w-[15.875rem] font-roboto text-button-lg leading-[1.25rem]"
          />
          <BorderBtn
            text="Finished for today"
            py="py-[0.813rem]"
            bg="bg-black"
            className="w-[15.875rem] text-white border-black font-roboto text-button-lg leading-[1.25rem] hover:text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default LearningModal;
