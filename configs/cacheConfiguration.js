const NodeCache = require("node-cache");
const mysql = require("mysql2/promise");
const dbConfig = require("./dbConfiguration");

// Configuração do cache / Tempo de expiração em segundos
const cache = new NodeCache({ stdTTL: 30 });

// Função para buscar dados do banco de dados ou do cache
const getData = async (key, query) => {
  let data = cache.get(key);

  if (!data) {
    // Se os dados não estiverem em cache, busca do banco de dados
    const connection = await mysql.createConnection(dbConfig);
    [data] = await connection.query(query);

    // Salva os dados no cache
    cache.set(key, data);
  }

  return data;
};

module.exports = { cache, getData };
