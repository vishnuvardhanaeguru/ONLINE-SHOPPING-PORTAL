import React, { createContext, useContext, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem("email");
    const fullName = localStorage.getItem("fullName");
    return email ? { email, fullName } : null;
  });

  const persistSession = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("email", data.email);
    localStorage.setItem("fullName", data.fullName);
    setUser({ email: data.email, fullName: data.fullName });
  };

  const login = async (credentials) => {
    const { data } = await authService.login(credentials);
    persistSession(data.data);
  };

  const register = async (payload) => {
    const { data } = await authService.register(payload);
    persistSession(data.data);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.clear();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
