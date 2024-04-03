const express = require("express");
const router = express.Router();

const produtoController = require('../controllers/produtoController');
const nomeMiddleware = require('../middlewares/nomeMiddleware');

/* GET produtos */
router.get('/', produtoController.findAll);

/* POST produtos */
router.post('/', nomeMiddleware.validaNome, produtoController.save);

/* PUT produtos */
router.put('/', produtoController.update);

/* DELETE produtos */
router.delete('/:id', produtoController.remove);

module.exports = router;
