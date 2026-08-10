import { FirebaseError } from "firebase/app";

// 사용자가 팝업을 닫거나 버튼을 연달아 눌러 이전 팝업이 취소된 경우.
// 실패가 아니라 취소이므로 에러 메시지를 띄우지 않는다.
const CANCELLED_CODES = new Set([
  "auth/popup-closed-by-user",
  "auth/cancelled-popup-request",
  "auth/user-cancelled",
]);

const MESSAGES: Record<string, string> = {
  "auth/popup-blocked":
    "브라우저가 로그인 창을 막았어요. 팝업 차단을 해제하고 다시 시도해 주세요.",
  "auth/network-request-failed":
    "네트워크 연결을 확인하고 다시 시도해 주세요.",
  "auth/account-exists-with-different-credential":
    "이미 다른 방법으로 가입한 이메일이에요. 기존 로그인 방법을 사용해 주세요.",
  "auth/unauthorized-domain":
    "허용되지 않은 주소에서 로그인을 시도했어요. 관리자에게 문의해 주세요.",
};

/**
 * 로그인 실패를 사용자에게 보여줄 메시지로 바꾼다.
 * 사용자가 취소한 경우 null을 반환하므로, 호출부는 아무것도 표시하지 않아야 한다.
 */
export function toLoginErrorMessage(error: unknown): string | null {
  const code = error instanceof FirebaseError ? error.code : "";

  if (CANCELLED_CODES.has(code)) return null;
  return MESSAGES[code] ?? "로그인에 실패했어요. 다시 시도해 주세요.";
}
