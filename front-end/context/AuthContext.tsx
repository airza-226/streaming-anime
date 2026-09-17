'use client'
import { getMe } from "@/lib/api/auth";
import { clearToken, getToken, setToken } from "@/lib/api/client";
import { User } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { login as loginApi, register as registerApi } from "@/lib/api/auth";
type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function restoreSession() {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const me = await getMe();
        setUser(me);
      } catch (error) {
        clearToken();
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: loggedInUser } = await loginApi(email, password);
    setToken(token);
    setUser(loggedInUser);
  };
  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const { token, user: newUser } = await registerApi(
      username,
      email,
      password,
    );
    setToken(token);
    setUser(newUser);
  };
  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth need call in AuthProvider");
  return ctx;
}
