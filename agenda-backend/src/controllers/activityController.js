const Activity = require("../models/Activity");

module.exports = {
  async create(req, res) {
    const { nome, descricao, inicio, fim, status } = req.body;
    try {
      const atividade = await Activity.create({
        nome,
        descricao,
        inicio: new Date(inicio),
        fim: new Date(fim),
        status,
        userId: req.userId
      });

      return res.json({ mensagem: "Atividade criada!", atividade });
    } catch (error) {
      return res.status(500).json({
        erro: "Erro ao criar atividade",
        detalhes: error
      });
    }
  },

  async list(req, res) {
    try {
      const atividades = await Activity.findAll({
        where: { userId: req.userId }
      });

      return res.json(atividades);
    } catch (error) {
      return res.status(500).json({
        erro: "Erro ao listar atividades",
        detalhes: error
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome, descricao, inicio, fim } = req.body;

    try {
      const atividade = await Activity.findOne({
        where: { id, userId: req.userId }
      });

      if (!atividade)
        return res.status(404).json({ erro: "Atividade não encontrada" });

      await atividade.update({
        nome,
        descricao,
        inicio: new Date(inicio),
        fim: new Date(fim)
      });

      return res.json({
        mensagem: "Atividade atualizada!",
        atividade
      });
    } catch (error) {
      return res.status(500).json({
        erro: "Erro ao atualizar atividade",
        detalhes: error
      });
    }
  },

  async remove(req, res) {
    const { id } = req.params;

    try {
      const atividade = await Activity.findOne({
        where: { id, userId: req.userId }
      });

      if (!atividade)
        return res.status(404).json({ erro: "Atividade não encontrada" });

      await atividade.destroy();

      return res.json({ mensagem: "Atividade excluída!" });
    } catch (error) {
      return res.status(500).json({
        erro: "Erro ao excluir atividade",
        detalhes: error
      });
    }
  },

  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const atividade = await Activity.findOne({
        where: { id, userId: req.userId }
      });

      if (!atividade)
        return res.status(404).json({ erro: "Atividade não encontrada" });

      await atividade.update({ status });

      return res.json({
        mensagem: "Status atualizado!",
        atividade
      });
    } catch (error) {
      return res.status(500).json({
        erro: "Erro ao alterar status",
        detalhes: error
      });
    }
  }
};
