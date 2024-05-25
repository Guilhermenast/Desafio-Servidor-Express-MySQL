const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(dbConfig);

connection.then(() => {
  console.log('Conectado ao banco de dados MySQL.');
}).catch(err => {
  console.error('Erro ao conectar-se ao banco de dados MySQL:', err.message);
});

module.exports = connection;
