import { createContext, useContext } from "react";
import { assertAuthResult, authClient } from "./auth-client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data, isPending } = authClient.useSession();
  const user = data?.user || null;

  const login = async (email, password) => {
    const result = assertAuthResult(await authClient.signIn.email({ email: email.trim(), password }));
    return result?.user || user;
  };

  const signup = async (email, password, name, plan = "personal") => {
    const result = assertAuthResult(await authClient.signUp.email({
      email: email.trim(),
      password,
      name: name.trim(),
      plan,
    }));
    return result?.user || user;
  };

  const logout = async () => assertAuthResult(await authClient.signOut());

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isPending, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
