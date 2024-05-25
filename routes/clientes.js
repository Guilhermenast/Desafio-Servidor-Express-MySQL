const express = require("express");
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const clientesMiddleware = require('../middlewares/clientesMiddleware');

/* GET clientes */
router.get('/', clienteController.findAll);

/* POST clientes */
router.post('/', clientesMiddleware.validarCamposCliente, clienteController.save);

/* PUT clientes */
router.put('/:id', clienteController.update);

/* DELETE clientes */
router.delete('/:id', clienteController.remove);

module.exports = router;