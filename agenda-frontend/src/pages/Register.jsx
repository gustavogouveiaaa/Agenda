import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ login: "", senha: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(form.login, form.senha);
      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch {
      alert("Erro ao registrar.");
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">

        <h1 className="register-title">Criar Conta</h1>
        <p className="register-subtitle">Preencha para continuar</p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            placeholder="Login"
            value={form.login}
            onChange={(e) => setForm({ ...form, login: e.target.value })}
            className="register-input"
          />

          <input
            placeholder="Senha"
            type="password"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            className="register-input"
          />

          <button type="submit" className="register-button">
            Registrar
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="register-secondary-button"
        >
          Já tenho conta
        </button>
      </div>
    </div>
  );
}
