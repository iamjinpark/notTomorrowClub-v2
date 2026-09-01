import { useCallback, useEffect, useRef } from "react";

import { useModal } from "@/hooks/useModal";

/**
 * 트리거 버튼 하나로 여닫는 드롭다운의 상태와 접근성 동작을 캡슐화한다.
 * 반환된 ref를 각각 바깥 컨테이너, 트리거, 첫 항목에 연결해서 쓴다.
 */
export function useDropdown() {
  const { isOpen, open, close } = useModal();

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      triggerRef.current?.focus();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    firstItemRef.current?.focus();

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
      return;
    }
    open();
  }, [isOpen, open, close]);

  return { isOpen, toggle, close, containerRef, triggerRef, firstItemRef };
}
