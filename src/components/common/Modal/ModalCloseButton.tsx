import closeIcon from "@/assets/icon/close-1.svg";

interface ModalCloseButtonProps {
  onClose: () => void;
}

// 시안 실측 — 클릭 영역 63.275px, 글리프 23.275px(여백 20px). 마이페이지 모달 3종 공통.
export default function ModalCloseButton({ onClose }: ModalCloseButtonProps) {
  return (
    <button
      type="button"
      aria-label="닫기"
      onClick={onClose}
      className="absolute top-0 right-0 flex size-[3.9547rem] items-start justify-end p-[1.25rem]"
    >
      <img src={closeIcon} alt="" className="size-[1.4547rem]" />
    </button>
  );
}
