import { useContext } from "react";

import { AuthContext, type AuthContextValue } from "@/context/authContext";

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서만 쓸 수 있습니다");
  }
  return context;
}
