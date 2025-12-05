import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ login: "", senha: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form.login, form.senha);
      navigate("/dashboard");
    } catch {
      alert("Login inválido!");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="login-title">Minha Agenda</h1>
        <p className="login-subtitle">Bem-vindo de volta 👋</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            placeholder="Login"
            value={form.login}
            onChange={(e) => setForm({ ...form, login: e.target.value })}
            className="login-input"
          />

          <input
            placeholder="Senha"
            type="password"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            className="login-input"
          />

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <button
          onClick={() => navigate("/register")}
          className="login-secondary-button"
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}
