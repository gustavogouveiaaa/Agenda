const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async register(req, res) {
    const { login, senha } = req.body;
    try {
      const hash = await bcrypt.hash(senha, 10);
      const novo = await User.create({ login, senha: hash });
      return res.json({ mensagem: "Usuário criado!", usuario: { id: novo.id, login: novo.login } });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao registrar", detalhes: err });
    }
  },

  async login(req, res) {
    const { login, senha } = req.body;
    try {
      const user = await User.findOne({ where: { login } });
      if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

      const ok = await bcrypt.compare(senha, user.senha);
      if (!ok) return res.status(401).json({ erro: "Senha incorreta" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return res.json({ mensagem: "Login OK!", token, usuario: { id: user.id, login: user.login } });
    } catch (err) {
      return res.status(500).json({ erro: "Erro no login", detalhes: err });
    }
  }
};
