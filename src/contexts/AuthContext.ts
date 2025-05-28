import { createContext } from "react";

type User = {
  email: string;
};

export type AuthContextType = {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signin: (email: string, password: string) => string | void;
  signup: (email: string, password: string) => string | void;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
