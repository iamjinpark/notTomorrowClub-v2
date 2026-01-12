import loginOverlay from "@/assets/img/loginOverlay.png";

function LoginRequiredOverlay({ goLogin }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 h-[600px] pointer-events-none">
      <div className="absolute inset-0">
        <img src={loginOverlay} alt="Login Overlay" className="w-full" />
        <div className="absolute inset-0 flex flex-col items-center pt-58">
          <div className="text-center pointer-events-auto">
            <p className="ko-headline-lg">
              로그인하시면 영어 문장을 확인할 수 있어요.
            </p>
            <button
              onClick={goLogin}
              className="rounded-full px-6 py-[0.625rem] bg-charcoal text-white mt-[2.625rem] en-button-1"
            >
              Join NTC CLUB
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRequiredOverlay;
