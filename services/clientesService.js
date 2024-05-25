const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 30 });

const connection = require("../configs/dbConfiguration");

const findAll = async () => {
  const cacheKey = "clientes:findAll";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("Dados do cache utilizados para clientes:findAll");
    return cachedData;
  } else {
    const clientes = await (await connection).execute("SELECT * FROM clientes");
    cache.set(cacheKey, clientes[0]);
    console.log("Dados do banco de dados utilizados para clientes:findAll");
    return clientes[0];
  }
};

const update = async (cliente) => {
  const query =
    "UPDATE clientes SET Nome = ?, Sobrenome = ?, Email = ?, Idade = ? WHERE Id = ?";
  const isOk = await (
    await connection
  ).execute(query, [
    cliente.Nome,
    cliente.Sobrenome,
    cliente.Email,
    cliente.Idade,
    cliente.Id,
  ]);

  // Invalidar o cache após uma atualização
  cache.del("clientes:findAll");

  return isOk[0].affectedRows === 1;
};

const save = async (cliente) => {
  const query =
    "INSERT INTO clientes(nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)";
  const isOk = await (
    await connection
  ).execute(query, [
    cliente.nome,
    cliente.sobrenome,
    cliente.email,
    cliente.idade,
  ]);

  // Invalidar o cache após uma inserção
  cache.del("clientes:findAll");

  return isOk[0].affectedRows === 1;
};

const remove = async (id) => {
  const query = "DELETE FROM clientes WHERE id = ?";
  const isOk = await (await connection).execute(query, [id]);

  // Invalidar o cache após uma remoção
  cache.del("clientes:findAll");

  return isOk[0].affectedRows === 1;
};

module.exports = {
  findAll,
  save,
  remove,
  update,
};
