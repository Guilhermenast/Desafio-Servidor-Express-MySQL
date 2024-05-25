function validarCamposProduto(req, res, next) {
  const { nome, descricao, preco, data_atualizado } = req.body;

  if (!nome || !descricao || !preco || !data_atualizado) {
    return res
      .status(400)
      .json({
        error: "Todos os campos são obrigatórios para criar um produto.",
      });
  }

  if (typeof preco !== "number" || preco <= 0) {
    return res
      .status(400)
      .json({ error: "O preço deve ser um número positivo." });
  }

  if (!(data_atualizado instanceof Date) || isNaN(data_atualizado.getTime())) {
    return res
      .status(400)
      .json({
        error:
          "A data de atualização do produto é inválida. Certifique-se de que a data está no formato correto.",
      });
  }

  next();
}

module.exports = { validarCamposProduto };
