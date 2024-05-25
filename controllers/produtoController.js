const produtoService = require("../services/produtosService");

const findAll = async (req, res) => {
  try {
    const produtos = await produtoService.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const save = async (req, res) => {
  try {
    const result = await produtoService.save(req.body);
    if (result) {
      res.status(200).json({ message: "Produto salvo com sucesso" });
    } else {
      res.status(400).json({ error: "Falha ao salvar produto" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const update = async (req, res) => {
  try {
    const result = await produtoService.update(req.body);
    if (result) {
      res.status(200).json({ message: "Produto atualizado com sucesso" });
    } else {
      res.status(400).json({ error: "Falha ao atualizar produto" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await produtoService.remove(id);
    if (result) {
      res.status(200).json({ message: "Produto removido com sucesso" });
    } else {
      res.status(400).json({ error: "Falha ao remover produto" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  findAll,
  save,
  remove,
  update,
};
