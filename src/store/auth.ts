import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { atom } from "jotai";

import { auth } from "@/lib/firebase";
import type { AuthUser } from "@/types/auth";

// prompt를 지정하지 않으면 구글이 직전 계정으로 바로 로그인해서 계정 전환이 불가능하다
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

function toAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    name: user.displayName ?? "NTC 회원",
    email: user.email,
    photoUrl: user.photoURL,
  };
}

const LAST_USER_KEY = "ntc.lastUser";

function readLastUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(LAST_USER_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as AuthUser).uid !== "string" ||
      typeof (parsed as AuthUser).name !== "string"
    ) {
      return null;
    }
    return parsed as AuthUser;
  } catch {
    return null;
  }
}

function saveLastUser(user: AuthUser | null): void {
  try {
    if (user) localStorage.setItem(LAST_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(LAST_USER_KEY);
  } catch {
    return;
  }
}

interface AuthState {
  user: AuthUser | null;
  /** Firebase가 저장된 세션을 복구하는 동안 true */
  isLoading: boolean;
}

export const authAtom = atom<AuthState>({
  user: readLastUser(),
  isLoading: true,
});

// 구독 하나가 로그인/로그아웃과 새로고침 후 세션 복구를 모두 처리한다.
// onMount가 반환한 해제 함수는 Jotai가 언마운트 시 호출한다.
authAtom.onMount = (set) =>
  onAuthStateChanged(auth, (firebaseUser) => {
    const user = firebaseUser ? toAuthUser(firebaseUser) : null;
    saveLastUser(user);
    set({ user, isLoading: false });
  });

export function login(): Promise<unknown> {
  return signInWithPopup(auth, googleProvider);
}

export function logout(): Promise<void> {
  return signOut(auth);
}
