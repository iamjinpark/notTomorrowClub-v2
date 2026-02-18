import { Link } from "react-router-dom";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/common/Modal/Modal";

function Login() {
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

        <button
          type="button"
          className="bg-[#FEE500] py-3.5 px-12.5 mt-[1.563rem] border-none rounded-full text-pretendard text-[1.125rem] leading-4.5 font-semibold tracking-[-4%] hover:brightness-105"
        >
          카카오계정으로 로그인
        </button>

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
