const validaNome = (request, response, next) => {
    const { body } = request;
    if (body.nome === undefined) {
        return response.status(400)
            .json({ message: 'O campo "nome" não pode ser vazio'});
    }
    next();
};
module.exports = { validaNome };
