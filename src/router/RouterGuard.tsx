import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

export function RouterGuard() {
  const { isLoggedIn, isLoading } = useAuth();

  // 세션 복구 전에는 판단을 보류한다 (새로고침 시 로그인 화면이 잠깐 보이는 것 방지)
  if (isLoading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
