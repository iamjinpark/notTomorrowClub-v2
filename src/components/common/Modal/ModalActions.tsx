import BorderBtn from "../BorderBtn";

interface ModalActionsProps {
  onCancel: () => void;
  onSave: () => void;
  saveText?: string;
}

// 시안 실측 — Cancel/Save 쌍 233x46. 마이페이지 모달 3종 공통.
export default function ModalActions({
  onCancel,
  onSave,
  saveText = "Save",
}: ModalActionsProps) {
  return (
    <div className="flex h-[2.875rem] w-[14.5625rem] items-center justify-between">
      <BorderBtn
        text="Cancel"
        bg="bg-white hover:bg-lightyellow"
        px="px-[1.875rem]"
        py="py-[0.8125rem]"
        className="en-button-1 leading-none"
        onClick={onCancel}
      />
      <BorderBtn
        text={saveText}
        bg="bg-black text-white hover:bg-black"
        px="px-[1.875rem]"
        py="py-[0.8125rem]"
        className="en-button-1 leading-none"
        onClick={onSave}
      />
    </div>
  );
}
