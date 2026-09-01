import { useAtomValue } from "jotai";

import { authAtom, login, logout } from "@/store/auth";

export function useAuth() {
  const { user, isLoading } = useAtomValue(authAtom);

  return { user, isLoading, isLoggedIn: user !== null, login, logout };
}
