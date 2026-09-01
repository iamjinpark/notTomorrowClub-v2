import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useModal } from "@/hooks/useModal";
import Modal from "@/components/common/Modal/Modal";
import { useAuth } from "@/hooks/useAuth";
import { toLoginErrorMessage } from "@/utils/authError";

function Login() {
  const { login, isLoggedIn, isLoading } = useAuth();
  const { state } = useLocation();
  const [error, setError] = useState<string>();

  const handleLogin = () => {
    setError(undefined);
    login().catch((e: unknown) => {
      // 사용자가 팝업을 닫은 경우 null이 온다. 취소를 실패로 알리지 않는다
      const message = toLoginErrorMessage(e);
      if (message) setError(message);
    });
  };

  const {
    isOpen: isPolicyOpen,
    open: openPolicy,
    close: closePolicy,
  } = useModal();
  const {
    isOpen: isHelpLoginOpen,
    open: openHelpLogin,
    close: closeHelpLogin,
  } = useModal();

  // 로그인 성공 시에도 이 분기로 빠져나간다 (가드가 넘긴 경로 우선)
  if (!isLoading && isLoggedIn) {
    const from = (state as { from?: string } | null)?.from ?? "/";
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[2.063rem] pt-26">
        <div className="flex flex-col gap-[0.688rem] items-center en-title-xl leading-9 ">
          <p>Start your day with 5 sentences.</p>
          <p>Small. Light. Daily</p>
        </div>

        {/* 시안은 카카오 버튼이지만 구글 로그인으로 구현했다 (디자인 확인 필요) */}
        <div className="mt-[1.563rem] flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleLogin}
            className="border-gray5 text-pretendard rounded-full border bg-white px-12.5 py-3.5 text-[1.125rem] leading-4.5 font-semibold tracking-[-4%] hover:brightness-95"
          >
            Google 계정으로 로그인
          </button>
          {error && <p className="ko-button-1 text-red">{error}</p>}
        </div>

        <div className="ko-button-1 text-gray3 flex flex-col items-center gap-2">
          <button
            onClick={openPolicy}
            className="h-3.5 text-gray3 underline underline-offset-1 decoration-1"
          >
            개인정보 처리방침 자세히 보기
          </button>

          <button
            onClick={openHelpLogin}
            className="h-3.5 text-gray3 underline underline-offset-1 decoration-1"
          >
            로그인 관련 도움말
          </button>
        </div>
      </div>

      <Modal isOpen={isPolicyOpen} onClose={closePolicy} type="policy" />
      <Modal
        isOpen={isHelpLoginOpen}
        onClose={closeHelpLogin}
        type="helpLogin"
      />
    </>
  );
}

export default Login;
