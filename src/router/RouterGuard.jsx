import { Navigate, Outlet } from "react-router-dom";

export function RouterGuard() {
  // TODO: 실제 로그인 체크 로직으로 변경 필요
  const isLogin = false;

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
