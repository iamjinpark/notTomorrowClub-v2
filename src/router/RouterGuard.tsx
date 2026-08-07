import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import LoginRequiredOverlay from "@/components/common/LoginRequiredOverlay";
import { useAuth } from "@/hooks/useAuth";

/** 로그인 필수 — 비로그인은 로그인 화면으로 보낸다 */
export function RouterGuard() {
  const { isLoggedIn, isLoading } = useAuth();
  const { pathname } = useLocation();

  // 세션 복구 전에는 판단을 보류한다 (새로고침 시 로그인 화면이 잠깐 보이는 것 방지)
  if (isLoading) return null;

  if (!isLoggedIn) {
    // 로그인 후 원래 가려던 곳으로 돌려보내기 위해 경로를 넘긴다
    return <Navigate to="/login" replace state={{ from: pathname }} />;
  }
  return <Outlet />;
}

/** 화면은 보여주고 오버레이로만 로그인을 유도한다 */
export function LoginOverlayGuard() {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const showOverlay = !isLoading && !isLoggedIn;

  // 오버레이가 footer까지 덮지 않도록 스크롤 잠금 (Modal과 동일 패턴)
  useEffect(() => {
    if (!showOverlay) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showOverlay]);

  if (isLoading) return null;

  return (
    <>
      <Outlet />
      {showOverlay && (
        <LoginRequiredOverlay goLogin={() => navigate("/login")} />
      )}
    </>
  );
}
