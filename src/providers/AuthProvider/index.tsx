import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";
import { LoginData } from "../../pages/Login/validator";
import { type AuthContextValues, AuthProviderProps } from "./types";

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("@your-todolist:token");

        if (!token) {
          return;
        }

        api.defaults.headers.common.authorization = `Bearer ${token}`;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (data: LoginData) => {
    try {
      const response = await api.post("/login", data);

      const { token } = response.data;

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      localStorage.setItem("@your-todolist:token", token);


      navigate('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
