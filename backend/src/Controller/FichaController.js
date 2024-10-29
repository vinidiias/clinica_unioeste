const Ficha = require('../Models/Ficha');
const { index } = require('./PessoaController');
const { create } = require('./UserController');

module.exports = {
    async create(req, res) {
        const { profissao, escolaridade, curso, anoPeriodo, turno, dia, vinculo, setor, comunidadeExterna, trabalha, horario, acompanhamentoPsicologico, tempoPscicologo, acompanhamentoPsiquiatrico, tempo } = req.body;
        const { user_id } = req.params;

        try {
            // Cria o documento usando o modelo Ficha
            const createFicha = await Ficha.create({
                profissao, 
                escolaridade, 
                curso, 
                anoPeriodo, 
                turno, 
                dia, 
                vinculo, 
                setor, 
                comunidadeExterna, 
                trabalha, 
                horario, 
                acompanhamentoPsicologico, 
                tempoPscicologo, 
                acompanhamentoPsiquiatrico, 
                tempo,
                user: user_id
            });

            // Popula o campo 'user' com as informações do usuário associado
            await createFicha.populate('user').execPopulate();

            return res.status(200).send(createFicha);
        }
        catch (err) {
            return res.status(400).send(err);
        }
    },

    async delete (req, res) {

    }
}
