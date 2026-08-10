import { useAtomValue } from "jotai";

import "@/assets/css/index.css";
import Router from "@/router/Router";
import { authAtom } from "@/store/auth";

// authAtom의 onMount 구독은 이 atom을 읽는 컴포넌트가 있을 때만 살아 있다.
// auth를 읽지 않는 화면(404 등)에서 구독이 끊기지 않도록 루트에서 붙잡아 둔다.
// Router를 리렌더시키지 않으려고 별도 컴포넌트로 분리했다.
function AuthSubscription() {
  useAtomValue(authAtom);
  return null;
}

function App() {
  return (
    <>
      <AuthSubscription />
      <Router />
    </>
  );
}

export default App;
