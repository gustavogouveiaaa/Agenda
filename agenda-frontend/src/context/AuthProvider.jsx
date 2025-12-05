import { useState } from "react";
import api from "../api/api";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  async function login(login, senha) {
    const res = await api.post("/auth/login", { login, senha });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.usuario));

    setUser(res.data.usuario);
  }

  async function register(login, senha) {
    return api.post("/auth/register", { login, senha });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
