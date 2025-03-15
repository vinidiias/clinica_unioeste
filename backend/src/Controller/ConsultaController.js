const Ficha = require('../Models/FichaModel');
const User = require('../Models/UserModel');
const Consulta = require('../Models/ConsultaModel')

module.exports = {

    // Avaliar ficha e definir prioridade
    async prioridadeFicha(req, res) {
       
        const { ficha_id, user_id } = req.params;
        const { prioridade } = req.body; // 'Baixa', 'Média', 'Alta'
        const { auth } = req.headers;

        const psico = await User.findById(user_id);
        if(!psico) return res.status(400).send({ message: 'Usuario nao encontrado' });

        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'});

        const validRole = 'psicologo'
        if(psico.role != validRole) return res.status(400).send({ message: 'Somente psicologo pode avaliar' });

        if (!['Baixa', 'Média', 'Alta'].includes(prioridade)) {
            return res.status(400).send({ message: 'Prioridade inválida' });
        }

        try {
            const ficha = await Ficha.findById(ficha_id);

            if (!ficha) {
                return res.status(400).send({ message: 'Ficha não encontrada' });
            }

            ficha.prioridade = prioridade;
            ficha.status = 'Avaliada';
            ficha.triagem = false

            await ficha.save();

            return res.status(200).send({ 
                message: 'Ficha avaliada com sucesso', 
                ficha 
            });

        } catch (err) {
            return res.status(500).send({ 
                message: 'Erro ao avaliar ficha', 
                error: err.message 
            });
        }
    },

    async agendarTriagem(req, res){
        const {ficha_id, psico_id, paciente_id } = req.params;
        const { agenda } = req.body;
        const { auth } = req.headers;

        const psico = await User.findById(psico_id);
        if(!psico) return res.status(400).send({ message: 'Psicologo nao encontrado' });

        const paciente = await User.findById(paciente_id);
        if(!paciente) return res.status(400).send({ message: 'Paciente nao encontrado'});

        const validRolePaciente = 'paciente';
        if(paciente.role !== validRolePaciente) return 

        if(psico_id !== auth) return res.status(400).send({ message: 'Nao autorizado'});

        const validRolePsico = 'psicologo'
        if(psico.role !== validRolePsico) return res.status(400).send({ message: 'Somente psicologo pode avaliar' });

        try{
            const ficha = await Ficha.findById(ficha_id);
            if(!ficha) return res.status(400).send({ message: 'Ficha nao encontrada' });
            
            ficha.status = "Em avaliação";
            ficha.agenda = agenda;

            await ficha.save();

            return res.status(200).send({
                message: 'Triagem agendada com sucesso',
                ficha
            })
        }
        catch(err){
            return res.status(400).send({
                message: 'Erro ao agerndar paciente.',
                error: err.message
            });
        }
    }
};
