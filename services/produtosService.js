const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 30 });

const connection = require("../configs/dbConfiguration");

const findAll = async () => {
  const cacheKey = "produtos:findAll";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("Dados do cache utilizados para produtos:findAll");
    return cachedData;
  } else {
    const produtos = await (await connection).execute("SELECT * FROM produtos");
    cache.set(cacheKey, produtos[0]);
    console.log("Dados do banco de dados utilizados para produtos:findAll");
    return produtos[0];
  }
};

const update = async (produto) => {
  const query =
    "UPDATE produtos SET Nome = ?, Preco = ?, Descricao = ?, DataAtualizacao = ? WHERE Id = ?";
  const isOk = await (
    await connection
  ).execute(query, [
    produto.Nome,
    produto.Preco,
    produto.Descricao,
    produto.DataAtualizacao,
    produto.Id,
  ]);

  // Invalidar o cache após uma atualização
  cache.del("produtos:findAll");

  return isOk[0].affectedRows === 1;
};

const save = async (produto) => {
  const query =
    "INSERT INTO produtos(Nome, Preco, Descricao, DataAtualizacao) VALUES (?, ?, ?, ?)";
  const isOk = await (
    await connection
  ).execute(query, [
    produto.Nome,
    produto.Preco,
    produto.Descricao,
    produto.DataAtualizacao,
  ]);

  // Invalidar o cache após uma inserção
  cache.del("produtos:findAll");

  return isOk[0].affectedRows === 1;
};

const remove = async (id) => {
  const query = "DELETE FROM produtos WHERE Id = ?";
  const isOk = await (await connection).execute(query, [id]);

  // Invalidar o cache após uma remoção
  cache.del("produtos:findAll");

  return isOk[0].affectedRows === 1;
};

module.exports = {
  findAll,
  save,
  remove,
  update,
};
