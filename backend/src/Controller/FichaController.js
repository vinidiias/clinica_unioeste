const Ficha = require('../Models/Ficha');
const { index } = require('./PessoaController');
const { create } = require('./UserController');

module.exports = {
    async create(req, res) {
        const { profissao, escolaridade, curso, anoPeriodo, turno, dia, vinculo, setor, comunidadeExterna, trabalha, horario, acompanhamentoPsicologico, acompanhamentoPsiquiatrico } = req.body;
        
        const { user_id } = req.params
        const { auth } = req.headers

        if( user_id !== auth) return res.status(400).send({ message: 'Não autorizado'})
        
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
                acompanhamentoPsicologico: {
                    realizado: acompanhamentoPsicologico.realizado,
                    tempoPscicologo: acompanhamentoPsicologico.tempoPscicologo
                },
                acompanhamentoPsiquiatrico: {
                    realizado: acompanhamentoPsiquiatrico.realizado,
                    tempo: acompanhamentoPsiquiatrico.tempo
                },
                user: user_id
            });
            //console.log(createFicha)

            // Popula o campo 'user' com as informações do usuário associado (se houver relação no schema)
            const fichaPopulada = await Ficha.findById(createFicha._id).populate('user')

            return res.status(200).send(createFicha);
        }
        catch (err) {
            return res.status(400).send(err);
        }
    }, 

    async indexAll (req, res) {
        try{
            const allFichario = await Ficha.find().populate('user')
            return res.status(200).send(allFichario)

        }
        catch(err){
            return res.status(400).send(err)
        }
    }
}