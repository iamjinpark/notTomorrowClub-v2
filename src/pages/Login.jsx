import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-[1.313rem] pt-[6.5rem]">
      <div className="text-title-lg font-semibold font-chakra text-center">
        <p>Start your day with 5 sentences.</p>
        <p>Small. Light. Daily</p>
      </div>
      <button
        type="button"
        className="bg-[#FBE64D] py-[0.75rem] px-[3.25rem] mt-[2.75rem] border-none rounded-full text-[1.125rem] font-chakra font-semibold hover:brightness-105"
      >
        Sign in with Kakao Account
      </button>

      <div className="text-gray3 text-sm flex flex-col items-center tracking-tighter leading-[14px]">
        <Link className="border-b-1">개인정보처리방침 자세히 보기</Link>
        <Link className="border-b-1">로그인 관련 도움말</Link>
      </div>
    </div>
  );
}

export default Login;
