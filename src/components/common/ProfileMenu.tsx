import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

import { findMood } from "@/constants/mood";
import { useAuth } from "@/hooks/useAuth";
import { useDropdown } from "@/hooks/useDropdown";
import { moodAtom } from "@/store/mood";

// 무드 아이콘과 같은 모서리 잘린 사각 타일.
// 컷 비율은 무드 SVG에서 그대로 가져왔다 (3.28478 / 31.6522 = 10.378%)
const MOOD_TILE_CLIP =
  "[clip-path:polygon(10.378%_0,_89.622%_0,_100%_10.378%,_100%_89.622%,_89.622%_100%,_10.378%_100%,_0_89.622%,_0_10.378%)]";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const moodId = useAtomValue(moodAtom);
  const { isOpen, toggle, close, containerRef, triggerRef, firstItemRef } =
    useDropdown();

  const handleLogout = () => {
    close();
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
        onClick={toggle}
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
