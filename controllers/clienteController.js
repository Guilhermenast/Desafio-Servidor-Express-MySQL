const clienteService = require("../services/clientesService");

const findAll = async (req, res) => {
  try {
    const clientes = await clienteService.findAll();
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ error: "Falha ao buscar clientes" });
  }
};

const save = async (req, res) => {
  try {
    const result = await clienteService.save(req.body);
    return result
      ? res.status(200).json({ message: "Cliente salvo com sucesso" })
      : res.status(400).json({ error: "Falha ao salvar cliente" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const update = async (req, res) => {
  try {
    const result = await clienteService.update(req.body);
    return result
      ? res.status(200).json({ message: "Cliente atualizado com sucesso" })
      : res.status(400).json({ error: "Falha ao atualizar cliente" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await clienteService.remove(id);
    return result
      ? res.status(200).json({ message: "Cliente removido com sucesso" })
      : res.status(400).json({ error: "Falha ao remover cliente" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  findAll,
  save,
  update,
  remove,
};
