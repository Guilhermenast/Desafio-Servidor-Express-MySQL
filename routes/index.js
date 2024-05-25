const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

/* GET página inicial */
router.get("/", async (req, res, next) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query("SELECT * FROM produtos;");
    res.json(rows);
    await connection.end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
