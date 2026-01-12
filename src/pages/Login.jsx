import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-[2.063rem] pt-[6.5rem]">
      <div className="flex flex-col gap-[0.688rem] items-center en-title-xl leading-[2.25rem] ">
        <p>Start your day with 5 sentences.</p>
        <p>Small. Light. Daily</p>
      </div>

      <button
        type="button"
        className="bg-[#FEE500] py-[0.875rem] px-[3.125rem] mt-[1.563rem] border-none rounded-full text-pretendard text-[1.125rem] leading-[1.125rem] font-semibold tracking-[-4%] hover:brightness-105"
      >
        카카오계정으로 로그인
      </button>

      <div className="ko-button-1 text-gray3 flex flex-col items-center gap-[0.5rem]">
        <button className="h-[0.875rem] text-gray3 underline underline-offset-1 decoration-[1px]">
          개인정보 처리방침 자세히 보기
        </button>

        <button className="h-[0.875rem] text-gray3 underline underline-offset-1 decoration-[1px]">
          로그인 관련 도움말
        </button>
      </div>
    </div>
  );
}

export default Login;
