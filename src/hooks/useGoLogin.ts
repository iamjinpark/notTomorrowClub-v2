import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * 로그인 화면으로 보내면서 지금 보던 경로를 넘긴다.
 * Login이 이 값으로 복귀시키므로, 로그인 진입점은 모두 이 훅을 거쳐야 한다.
 */
export function useGoLogin() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  // search까지 넘겨야 /learning?step=3 처럼 진행 상태가 있는 화면으로 정확히 돌아온다
  return useCallback(() => {
    if (pathname === "/login") return;
    navigate("/login", { state: { from: `${pathname}${search}` } });
  }, [navigate, pathname, search]);
}
