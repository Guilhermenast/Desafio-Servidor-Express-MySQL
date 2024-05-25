const express = require("express");
const router = express.Router();

const produtoController = require('../controllers/produtoController');
const produtosMiddleware = require('../middlewares/produtosMiddleware');

/* GET produtos */
router.get('/', produtoController.findAll);

/* POST produtos */
router.post('/', produtosMiddleware.validarCamposProduto, produtoController.save);

/* PUT produtos */
router.put('/:id', produtoController.update);

/* DELETE produtos */
router.delete('/:id', produtoController.remove);

module.exports = router;