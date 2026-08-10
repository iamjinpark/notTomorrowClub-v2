import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { findMood } from "@/constants/mood";
import { useAuth } from "@/hooks/useAuth";
import { useMood } from "@/hooks/useMood";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { moodId } = useMood();
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    firstItemRef.current?.focus();

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);
    // signOut은 사실상 실패하지 않지만, reject를 방치하면 unhandled rejection이 된다
    logout()
      .then(() => navigate("/"))
      .catch(() => undefined);
  };

  const initial = user?.name.trim().charAt(0).toUpperCase() ?? "";
  const mood = findMood(moodId);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`${user?.name ?? "회원"} 메뉴`}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`en-caption-1 text-black flex size-[26px] items-center justify-center leading-4 ${
          // 무드 아이콘은 모서리 잘린 사각 타일이라 원형 배경을 두지 않는다
          mood ? "" : "bg-red rounded-full"
        }`}
      >
        {mood ? <img src={mood.icon} alt="" className="size-full" /> : initial}
      </button>

      {isOpen && (
        <div
          role="menu"
          className="border-gray5 absolute top-full right-0 z-[200] mt-[8px] w-[110px] border bg-white py-[6px]"
        >
          <button
            ref={firstItemRef}
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="en-caption-1 text-black hover:bg-gray6 w-full px-[12px] py-[6px] text-left leading-4"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
