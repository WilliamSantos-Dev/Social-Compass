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
  getToken: () => string;
}

interface UserData {
  user: User;
  token: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);
  const router = useRouter();

  async function loadUser() {
    const token: string = localStorage.getItem("token") || "";
    const id: string = localStorage.getItem("id") || "";
    setUser(await api.getUser(id, token));
    setToken(token)
  }

  useEffect(() => {
    if(!user){
      loadUser();
    }
  }, []);

  const login = (userData: UserData) => {

    //apagando pois pode haver do outro login
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    //adicionando do novo
    localStorage.setItem("token", userData.token);
    localStorage.setItem("id", userData.user.id);



    setUser(userData.user);
    setToken(userData.token);
    setAuth(true);
    console.log("[LOGIN SUCESS]");
  };

  const logout = () => {
    setUser(undefined);
    setAuth(false);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    router.push("/")
  };

  const getToken = () => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      return localToken;
    } else {
      console.log("API: unauthorized");
      return "unauthorized";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
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
