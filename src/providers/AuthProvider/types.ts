import { ReactNode } from "react";
import { LoginData } from "../../pages/Login/validator";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextValues {
  signIn: (data: LoginData) => void; 
  loading: boolean; 
}