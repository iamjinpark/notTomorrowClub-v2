import closeIcon from "@/assets/img/closeIcon.svg";
import LearningModal from "./LearningModal";
import ConfirmModalContent from "./ConfirmModalContent";

import Confetti from "react-confetti";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

/**
 * 통합 모달 컴포넌트 - type으로 다양한 모달 타입 구분
 * @param {boolean} isOpen - 모달 열림 상태
 * @param {function} onClose - 모달 닫기 함수
 * @param {string} type - 모달 타입 ('learning','confirm')
 * @param {object} props - 각 모달 타입별 추가 props
 */

function Modal({ isOpen, onClose, type, ...props }) {
  const { width, height } = useWindowSize();
  const [runConfetti, setRunConfetti] = useState(true);
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    setConfettiKey((k) => k + 1);
    setRunConfetti(true);
  }, []);

  // ESC 키와 body 스크롤 제어
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
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
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // 모달 타입에 따른 컨텐츠 렌더링
  const renderModalContent = () => {
    switch (type) {
      case "learning":
        return <LearningModal onClose={onClose} {...props} />;
      case "confirm":
        return <ConfirmModalContent onClose={onClose} {...props} />;
      default:
        return null; // TODO : 추후 에러 모달 적용
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
      onClick={handleBackdropClick}
    >
      {type === "learning" && runConfetti && (
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

      <div
        className="relative flex flex-col items-end gap-[0.938rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>
          <img src={closeIcon} alt="Close Icon" className="" />
        </button>
        {renderModalContent()}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Modal;
