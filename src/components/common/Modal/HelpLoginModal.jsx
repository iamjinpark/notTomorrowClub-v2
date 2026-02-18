import closeIcon from "@/assets/img/closeIcon.svg";

function HelpLoginModal({ onClose }) {
  return (
    <div className="relative w-202 h-135 bg-lightyellow pt-11.75 pb-15.25 px-30.25 flex flex-col items-center gap-13.5">
      <button onClick={onClose} className="absolute top-5 right-5 ">
        <img src={closeIcon} alt="Close Icon" className="w-8.75 h-8.75" />
      </button>
      <p className="en-title-lg">Help with Login</p>

      <div className="w-full flex-1 pr-3.75 ko-caption-1">
        <ul className="">
          <li>
            <span>로그인 방법</span>
            <ul className="pl-2">
              <li>
                <span className="pr-2">∙</span>본 사이트는 카카오 계정 로그인을
                통해 이용이 가능합니다.
              </li>
              <li>
                <span className="pr-2">∙</span>로그인 시 닉네임, 이메일(설정된
                경우) 정보를 사용합니다.
              </li>
            </ul>
          </li>

          <li>
            <span>개인정보</span>
            <ul className="pl-2">
              <li>
                <span className="pr-2">∙</span>로그인 정보는 영어 문장 학습과
                학습기록 저장을 위해서만 사용됩니다.
              </li>
              <li>
                <span className="pr-2">∙</span>자세한 내용은 개인정보 처리방침을
                참고하세요. (준비중)
              </li>
            </ul>
          </li>

          <li>
            <span>로그인 문제 해결</span>
            <ul className="pl-2">
              <li>
                <span className="pr-2">∙</span>카카오 계정으로 정상 로그인
                가능한지 확인하세요.
              </li>
              <li>
                <span className="pr-2">∙</span>네트워크 연결 상태를 확인하세요.
              </li>
              <li>
                <span className="pr-2">∙</span>계속 문제가 발생하면 카카오
                고객센터를 이용하세요.
              </li>
            </ul>
          </li>

          <li>
            <span>회원 탈퇴 및 재가입</span>
            <ul className="pl-2">
              <li>
                <span className="pr-2">∙</span>
                탈퇴 시 모든 데이터가 삭제되며, 원하는 경우 다시 카카오
                로그인으로 가입 가능합니다.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HelpLoginModal;
