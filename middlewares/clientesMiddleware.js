function validarCamposCliente(req, res, next) {
    const { nome, sobrenome, email, idade } = req.body;
  
    if (!nome || !sobrenome || !email || !idade) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios para criar um cliente.' });
    }
  
    if (typeof idade !== 'number' || idade < 0) {
      return res.status(400).json({ error: 'A idade deve ser um número positivo.' });
    }
  
    next();
  }
  
  module.exports = { validarCamposCliente };
  