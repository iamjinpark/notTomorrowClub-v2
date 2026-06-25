import LearningModal from "./LearningModal";
import ConfirmModalContent from "./ConfirmModalContent";
import PolicyModal from "./PolicyModal";
import HelpLoginModal from "./HelpLoginModal";
import ShareModalContent from "./ShareModalContent";
import AlertModalContent from "./AlertModalContent";
import PostDetailModalContent from "./PostDetailModalContent";
import type { MakeItPost } from "@/types/makeIt";

import Confetti from "react-confetti";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

type ModalProps =
  | { type: "learning"; isOpen: boolean; onClose: () => void }
  | {
      type: "confirm";
      isOpen: boolean;
      onClose: () => void;
      onConfirm?: () => void;
      title?: string;
      message?: string;
      confirmText?: string;
      cancelText?: string;
    }
  | { type: "policy"; isOpen: boolean; onClose: () => void }
  | { type: "helpLogin"; isOpen: boolean; onClose: () => void }
  | {
      type: "share";
      isOpen: boolean;
      onClose: () => void;
      onSave?: (share: boolean) => void;
    }
  | { type: "alert"; isOpen: boolean; onClose: () => void; message?: string }
  | {
      type: "postDetail";
      isOpen: boolean;
      onClose: () => void;
      post: MakeItPost;
      isMine?: boolean;
      onDownload?: () => void;
      onEdit?: () => void;
      onDelete?: () => void;
    };

function Modal(modalProps: ModalProps) {
  const { isOpen, onClose } = modalProps;
  const { width, height } = useWindowSize();
  const [runConfetti, setRunConfetti] = useState(true);
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfettiKey((k) => k + 1);
    setRunConfetti(true);
  }, []);

  // ESC 키와 body 스크롤 제어
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 배경 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // 모달 타입에 따른 컨텐츠 렌더링
  const renderModalContent = () => {
    switch (modalProps.type) {
      case "learning":
        return <LearningModal onClose={onClose} />;
      case "confirm":
        return (
          <ConfirmModalContent
            onClose={onClose}
            onConfirm={modalProps.onConfirm}
            title={modalProps.title}
            message={modalProps.message}
            confirmText={modalProps.confirmText}
            cancelText={modalProps.cancelText}
          />
        );
      case "policy":
        return <PolicyModal onClose={onClose} />;
      case "helpLogin":
        return <HelpLoginModal onClose={onClose} />;
      case "share":
        return <ShareModalContent onClose={onClose} onSave={modalProps.onSave} />;
      case "alert":
        return <AlertModalContent onClose={onClose} message={modalProps.message} />;
      case "postDetail":
        return (
          <PostDetailModalContent
            onClose={onClose}
            post={modalProps.post}
            isMine={modalProps.isMine}
            onDownload={modalProps.onDownload}
            onEdit={modalProps.onEdit}
            onDelete={modalProps.onDelete}
          />
        );
      default:
        return null;
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
      onClick={handleBackdropClick}
    >
      {modalProps.type === "learning" && runConfetti && (
        <Confetti
          key={confettiKey}
          width={width}
          height={height}
          numberOfPieces={300}
          gravity={0.2}
          wind={0.01}
          recycle={true}
          run={true}
          tweenDuration={3500}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      )}

      <div onClick={(e) => e.stopPropagation()}>{renderModalContent()}</div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Modal;
