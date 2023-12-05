"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "../util/models";
import api from "../util/api";

export interface AuthContextType {
  user: User | undefined;
  login: (userData: UserData) => void;
  logout: () => void;
  id: string;
  token: string;
}

interface UserData {
  user: User;
  token: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string>(getTokenStorage());
  const [id, setId] = useState<string>(getIdStorage());
  const [user, setUser] = useState<User>();
  const router = useRouter();

  function loadUser() {
    async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (token && id) {
        setUser(await api.getUser(id, token));
        setToken(token);
        setId(id);
      }
    };
  }

  useEffect(() => {
    loadUser();
  }, [token, id]);

  const login = (userData: UserData) => {
    //adicionando do novo
    localStorage.setItem("token", userData.token);
    localStorage.setItem("id", userData.user.id);

    setUser(userData.user);
    setToken(userData.token);
    console.log("[LOGIN SUCESS]");
  };

  const logout = () => {
    setUser(undefined);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    router.push("/");
  };



  return (
    <AuthContext.Provider value={{ user, login, logout, id, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }

  return context;
};
function isClient() {
  return typeof window !== "undefined" && window.localStorage !== undefined;
}

const getTokenStorage = () => {
  if (isClient()) {
    return localStorage.getItem("token") as string;
  }
  return ""
};

const getIdStorage = () => {
  if (isClient()) {
    return localStorage.getItem("id") as string;
  }
  return ""
};
