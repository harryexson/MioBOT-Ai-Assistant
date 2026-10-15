import { useState, useEffect, createContext, useContext } from "react";
import { pb } from "./pb.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(pb.authStore.record);

  useEffect(() => {
    // Refresh token on startup if already logged in
    if (pb.authStore.isValid) {
      pb.collection("users").authRefresh().catch(() => pb.authStore.clear());
    }

    const unsub = pb.authStore.onChange((token, record) => {
      setUser(record);
    });
    return () => unsub();
  }, []);

  const login = async (email, password) => {
    const result = await pb.collection("users").authWithPassword(email, password);
    setUser(result.record);
    return result.record;
  };

  const signup = async (email, password, name, plan = "free") => {
    await pb.collection("users").create({
      email,
      password,
      passwordConfirm: password,
      name,
      plan,
    });
    return login(email, password);
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
