import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

type User = {
  email: string;
};

type StoredUser = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USERS_STORAGE_KEY = "users_bd";
const TOKEN_STORAGE_KEY = "user_token";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getStoredUsers = (): StoredUser[] => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (storedToken) {
      const { email } = JSON.parse(storedToken);
      const storedUsers = getStoredUsers();
      const matchingUser = storedUsers.find(
        (storedUser) => storedUser.email === email
      );

      if (matchingUser) {
        setUser({ email: matchingUser.email });
      }
    }

    setLoading(false);
  }, []);

  const signin = (email: string, password: string): string | void => {
    const storedUsers = getStoredUsers();
    const matchingUser = storedUsers.find(
      (storedUser) => storedUser.email === email
    );

    if (!matchingUser) return "Usuário não cadastrado";
    if (matchingUser.password !== password) return "E-mail ou senha incorretos";

    const token = Math.random().toString(36).substring(2);
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify({ email, token }));
    setUser({ email });
  };

  const signup = (email: string, password: string): string | void => {
    const storedUsers = getStoredUsers();
    const emailAlreadyExists = storedUsers.some(
      (storedUser) => storedUser.email === email
    );

    if (emailAlreadyExists) return "Já tem uma conta com esse E-mail";

    const updatedUsers = [...storedUsers, { email, password }];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, loading, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
