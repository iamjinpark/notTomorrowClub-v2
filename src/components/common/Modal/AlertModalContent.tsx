import BorderBtn from "../BorderBtn";

interface AlertModalContentProps {
  onClose: () => void;
  message?: string;
}

function AlertModalContent({
  onClose,
  message = "Choose a Today's Sentence first.\nSelect Sentence before you start writing.",
}: AlertModalContentProps) {
  return (
    <div className="bg-lightyellow flex w-[34.5rem] flex-col items-center gap-[2.5rem] px-10 py-[3.75rem] text-center">
      <p className="en-title-md whitespace-pre-line text-black">{message}</p>
      <BorderBtn
        text="OK"
        bg="bg-charcoal text-white hover:bg-charcoal"
        px="px-[2rem]"
        py="py-[0.625rem]"
        onClick={onClose}
      />
    </div>
  );
}

export default AlertModalContent;
