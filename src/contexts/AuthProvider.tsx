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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // <-- novo

  const getStoredUsers = (): StoredUser[] => {
    const usersJSON = localStorage.getItem("users_bd");
    return usersJSON ? JSON.parse(usersJSON) : [];
  };

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      const { email } = JSON.parse(userToken);
      const users = getStoredUsers();
      const foundUser = users.find((u) => u.email === email);
      if (foundUser) setUser({ email: foundUser.email });
    }
    setLoading(false); // <-- só libera quando terminar
  }, []);

  const signin = (email: string, password: string): string | void => {
    const users = getStoredUsers();
    const foundUser = users.find((u) => u.email === email);
    if (!foundUser) return "Usuário não cadastrado";
    if (foundUser.password !== password) return "E-mail ou senha incorretos";

    const token = Math.random().toString(36).substring(2);
    localStorage.setItem("user_token", JSON.stringify({ email, token }));
    setUser({ email });
  };

  const signup = (email: string, password: string): string | void => {
    const users = getStoredUsers();
    if (users.some((u) => u.email === email))
      return "Já tem uma conta com esse E-mail";

    const newUsers = [...users, { email, password }];
    localStorage.setItem("users_bd", JSON.stringify(newUsers));
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, loading, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
