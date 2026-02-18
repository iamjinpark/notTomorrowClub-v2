import closeIcon from "@/assets/img/closeIcon.svg";

function PolicyModal({ onClose }) {
  return (
    <div className="relative w-203 h-135 bg-lightyellow pt-11.75 pb-15.25 px-30.25 flex flex-col items-center gap-13.5">
      <button onClick={onClose} className="absolute top-5 right-5 ">
        <img src={closeIcon} alt="Close Icon" className="w-8.75 h-8.75" />
      </button>
      <p className="en-title-lg">Privacy Policy</p>

      <div className="overflow-y-scroll show-scrollbar w-full flex-1 pr-3.75 ko-caption-1">
        <span className="">개인정보 처리방침</span>
        <ul className="">
          <li>
            NOT TOMORROW CLUB(이하 &quot;사이트&quot;)은 개인정보보호법 등 관련
            법령을 준수하며, 이용자의 개인정보를 중요하게 보호합니다. 본
            개인정보 처리방침은 사이트가 제공하는 영어 문장 학습 서비스와
            관련하여, 이용자의 개인정보가 어떠한 목적과 방식으로 처리되는지를
            안내하기 위해 마련되었습니다.
          </li>
          <li>
            <span>1. 개인정보의 처리 목적</span>
            <p>
              사이트는 다음의 목적을 위해 개인정보를 처리합니다. 처리한
              개인정보는 아래 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
              변경되는 경우에는 사전에 동의를 받겠습니다.
            </p>
            <ul className="pl-3">
              <li>• 카카오 계정을 통한 회원 식별 및 로그인 처리</li>
              <li>• 영어 문장 학습 서비스 제공 및 학습 기록 저장</li>
              <li>• 이용자 문의 및 요청 사항 대응</li>
              <li>• 서비스 운영 및 개선</li>
            </ul>
          </li>
          <li>
            <span>2. 수집하는 개인정보의 항목</span>
            <p>
              사이트는 카카오 계정을 통한 로그인 과정에서 다음과 같은 개인정보를
              수집할 수 있습니다.
            </p>
            <ul className="pl-3">
              <li>• 필수 항목: 카카오 고유 식별자(ID)</li>
              <li>• 선택 항목: 닉네임, 프로필 이미지, 이메일 주소</li>
            </ul>
            <p className="pl-3">
              ※ 선택 항목은 카카오 로그인 설정 및 이용자의 동의 여부에 따라
              수집되지 않을 수 있습니다.
            </p>
          </li>
          <li>
            <span>3. 개인정보의 처리 및 보유 기간</span>
            <p>
              사이트는 원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후에는
              해당 정보를 지체 없이 파기합니다.
            </p>
            <ul className="pl-3">
              <li>• 회원 정보: 회원 탈퇴 시까지 보유</li>
              <li>
                • 단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 법령에서
                정한 기간 동안 보관
              </li>
            </ul>
          </li>
          <li>
            <span>4. 개인정보의 제3자 제공</span>
            <p>
              사이트는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
              다만, 다음의 경우에는 예외로 합니다.
            </p>
            <ul className="pl-3">
              <li>• 이용자가 사전에 동의한 경우</li>
              <li>• 법령에 따라 제공이 요구되는 경우</li>
            </ul>
          </li>
          <li>
            <span>5. 개인정보 처리의 위탁</span>
            <p>사이트는 개인정보 처리 업무를 외부 업체에 위탁하지 않습니다.</p>
          </li>
          <li>
            <span>6. 정보주체의 권리와 행사 방법</span>
            <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.</p>
            <ul className="pl-3">
              <li>• 개인정보 열람 요청</li>
              <li>• 개인정보 정정 또는 삭제 요청</li>
              <li>• 개인정보 처리 정지 요청</li>
            </ul>
            <p>
              위 권리 행사는 아래 기재된 개인정보 보호책임자에게 이메일을 통해
              요청할 수 있으며, 사이트는 관련 법령에 따라 지체 없이
              조치하겠습니다.
            </p>
          </li>
          <li>
            <span>7. 개인정보의 파기 절차 및 방법</span>
            <p>
              사이트는 개인정보 보유 기간의 경과 또는 처리 목적 달성 후에는 지체
              없이 개인정보를 파기합니다.
            </p>
            <ul className="pl-3">
              <li>• 파기 절차: 목적 달성 후 내부 방침에 따라 즉시 파기</li>
              <li>
                • 파기 방법: 전자적 파일 형태의 정보는 복구 불가능한 방법으로
                삭제
              </li>
            </ul>
          </li>
          <li>
            <span>8. 개인정보의 안전성 확보 조치</span>
            <p>
              사이트는 개인정보의 안전한 처리를 위해 다음과 같은 조치를 취하고
              있습니다.
            </p>
            <ul className="pl-3">
              <li>• 개인정보에 대한 접근 권한 최소화</li>
              <li>• 관리적·기술적 보호 조치 적용</li>
            </ul>
          </li>
          <li>
            <span>9. 개인정보 보호책임자</span>
            <p>
              사이트는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보와
              관련한 이용자의 문의 및 불만 처리를 위해 아래와 같이 개인정보
              보호책임자를 지정하고 있습니다.
            </p>
            <ul className="pl-3">
              <li>• 개인정보 보호책임자: 사이트 운영자</li>
              <li>• 연락처: (이메일 주소 기재)</li>
            </ul>
          </li>
          <li>
            <span>10. 개인정보 처리방침의 변경</span>
            <p>
              본 개인정보 처리방침의 내용이 추가, 삭제 또는 수정될 경우에는 변경
              사항을 사이트를 통해 사전에 공지하겠습니다.
            </p>
            <ul className="pl-3">
              <li>• 시행일자: 2026년 1월 1일</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PolicyModal;
