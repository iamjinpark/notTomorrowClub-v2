import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { findMood } from "@/constants/mood";
import { useAuth } from "@/hooks/useAuth";
import { useMood } from "@/hooks/useMood";

// 무드 아이콘과 같은 모서리 잘린 사각 타일.
// 컷 비율은 무드 SVG에서 그대로 가져왔다 (3.28478 / 31.6522 = 10.378%)
const MOOD_TILE_CLIP =
  "[clip-path:polygon(10.378%_0,_89.622%_0,_100%_10.378%,_100%_89.622%,_89.622%_100%,_10.378%_100%,_0_89.622%,_0_10.378%)]";

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
        className="flex size-[26px] items-center justify-center"
      >
        {/* clip-path를 버튼에 걸면 포커스 링까지 잘려서 안쪽 span에 건다 */}
        <span
          className={`en-caption-1 text-black flex size-full items-center justify-center leading-4 ${MOOD_TILE_CLIP} ${
            mood ? "" : "bg-red"
          }`}
        >
          {mood ? <img src={mood.icon} alt="" className="size-full" /> : initial}
        </span>
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
