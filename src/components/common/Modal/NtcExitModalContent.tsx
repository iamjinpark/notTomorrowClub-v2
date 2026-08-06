import BorderBtn from "../BorderBtn";
import ModalCloseButton from "./ModalCloseButton";

interface NtcExitModalContentProps {
  onClose: () => void;
  onConfirm?: () => void;
}

// 시안(Figma 90:1226) 실측 — 722x277, 배경 lightyellow, 패딩 pt 52 / pb 47 / px 115.
export default function NtcExitModalContent({
  onClose,
  onConfirm,
}: NtcExitModalContentProps) {
  return (
    <div className="bg-lightyellow relative w-[45.125rem] px-[7.1875rem] pt-[3.25rem] pb-[2.9375rem]">
      <ModalCloseButton onClose={onClose} />

      <div className="flex flex-col items-center gap-[2.1875rem]">
        <div className="flex w-[31.25rem] flex-col items-center gap-[2.5rem] text-center text-[#2b2b2b]">
          <p className="en-title-lg leading-none">
            Are you sure you want to leave NTC?
          </p>
          <p className="en-body-sm leading-[1.25rem]">
            Your KakaoTalk account will be unlinked,
            <br />
            and your NTC account will be deleted.
          </p>
        </div>

        <BorderBtn
          text="Delete account"
          bg="bg-black text-white hover:bg-black"
          px="px-[1.875rem]"
          py="py-[0.8125rem]"
          className="en-button-1 leading-none"
          onClick={() => {
            onConfirm?.();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
