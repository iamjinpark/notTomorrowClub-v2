import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

import { AuthContext } from "@/context/authContext";
import { auth } from "@/lib/firebase";
import type { AuthUser } from "@/types/auth";

function toAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    name: user.displayName ?? "NTC 회원",
    email: user.email,
    photoUrl: user.photoURL,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 로그인/로그아웃과 새로고침 후 세션 복구를 모두 이 구독이 처리한다
  useEffect(
    () =>
      onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser ? toAuthUser(firebaseUser) : null);
        setIsLoading(false);
      }),
    []
  );

  const login = useCallback(async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
