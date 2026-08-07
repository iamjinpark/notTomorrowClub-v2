import { createContext } from "react";

import type { AuthUser } from "@/types/auth";

export interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  /** Firebase가 저장된 세션을 복구하는 동안 true */
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
