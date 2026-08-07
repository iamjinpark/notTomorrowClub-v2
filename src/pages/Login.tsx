import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useModal } from "@/hooks/useModal";
import Modal from "@/components/common/Modal/Modal";
import { useAuth } from "@/hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>();

  const handleLogin = () => {
    setError(undefined);
    login()
      .then(() => navigate("/", { replace: true }))
      .catch(() => setError("로그인에 실패했어요. 다시 시도해 주세요."));
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
