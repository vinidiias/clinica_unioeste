const Ficha = require('../Models/FichaModel');
const User = require('../Models/UserModel');
const Consulta = require('../Models/ConsultaModel');

module.exports = {

    async agendarTriagem(req, res) {
        const { ficha_id, psico_id, paci_id } = req.params;
        const { agenda } = req.body;
        const { auth } = req.headers;
    
        try {
            const psico = await User.findById(psico_id);
            if (!psico) return res.status(400).send({ message: 'Psicólogo não encontrado' });
            if (psico.role !== 'psicologo') return res.status(400).send({ message: 'Somente psicólogos podem agendar a triagem' });
    
            const paciente = await User.findById(paci_id);
            if (!paciente) return res.status(400).send({ message: 'Paciente não encontrado' });
            if (paciente.role !== 'paciente') return res.status(400).send({ message: 'O ID fornecido não pertence a um paciente' });
    
            if (psico_id !== auth) return res.status(403).send({ message: 'Não autorizado' });
    
            const ficha = await Ficha.findById(ficha_id);
            if (!ficha) return res.status(400).send({ message: 'Ficha não encontrada' });

            // console.log(ficha.user._id)
            // console.log(paci_id)
    
            if (ficha.user.toString() !== paci_id) return res.status(400).send({ message: 'Ficha não pertence ao paciente informado' });
            
    
            const consultaExistente = await Consulta.findOne({
                paciente_id: paci_id,
                psicologo_id: psico_id
            });
    
            if (consultaExistente) return res.status(400).send({ message: 'Este paciente já tem uma triagem agendada com este psicólogo' });
            
    
            // Cria a consulta
            const createConsulta = await Consulta.create({
                agenda,
                psicologo_id: psico_id,
                paciente_id: paci_id
            });
    
            ficha.status = 'Em avaliação';
            await ficha.save();
    
            return res.status(201).send({
                message: 'Triagem agendada com sucesso',
                consulta: createConsulta,
                ficha
            });

        } catch (err) {
            return res.status(400).send({
                message: 'Erro ao agendar paciente para triagem.',
                error: err.message
            });
        }
    },

    async indexByPsicologo (req, res) {
        const { psico_id } = req.params;
        const { auth } = req.headers;

        try {
            const psico = await User.findById(psico_id);
            if (!psico) return res.status(400).send({ message: 'Psicólogo não encontrado' });
            if (psico.role !== 'psicologo') return res.status(400).send({ message: 'Somente psicólogos podem acessar essa consulta' });

            if (psico_id !== auth) return res.status(403).send({ message: 'Não autorizado' });

            // Busca a consulta
            const consulta = await Consulta.find({psicologo_id: psico_id})
                .populate('psicologo_id', 'name email role').sort({ agenda: 1 })

            if (!consulta) return res.status(404).send({ message: 'Consulta não encontrada' });

            return res.status(200).send(consulta);
        } catch (err) {
            return res.status(400).send({
                message: 'Erro ao listar consultas do psicologo',
                error: err.message
            });
        }
    },

    async indexAll (req, res) {
        try{
            const allConsultas = await Consulta.find()
            .populate('psicologo_id', 'name email role')
            .populate('paciente_id', 'name email role');

            return res.status(200).send(allConsultas)
        }
        catch(err){
            return res.status(400).send({
                message: 'Erro ao listar consultas',
                error: err.message
            })
        }
    },

    async update(req, res) {
        const { consulta_id, psico_id, paci_id } = req.params;
        const { agenda } = req.body; // Campo a ser atualizado
        const { auth } = req.headers; // ID do usuário autenticado
    
        try {
            const psico = await User.findById(psico_id);
            if (!psico) return res.status(400).send({ message: 'Psicólogo não encontrado' });

            const paciente = await User.findById(paci_id);
            if (!paciente) return res.status(400).send({ message: 'Paciente não encontrado' });

            if (paciente.role !== 'paciente') return res.status(400).send({ message: 'O ID fornecido não pertence a um paciente' });
            if (psico.role !== 'psicologo') return res.status(400).send({ message: 'Somente psicólogos podem acessar essa consulta' });

            const consulta = await Consulta.findById(consulta_id);
            if (!consulta) return res.status(404).send({ message: 'Consulta não encontrada' });
            
            // Verifica se o usuário autenticado é o psicólogo responsável
            if (consulta_id!== auth) {
                return res.status(403).send({ message: 'Somente o psicólogo responsável pode atualizar esta consulta' });
            }
    
            // Atualiza a agenda, se fornecida
            if (agenda) consulta.agenda = agenda;
    
            await consulta.save();
    
            return res.status(200).send({ message: 'Consulta atualizada com sucesso', consulta });
        } catch (err) {
            return res.status(500).send({
                message: 'Erro ao atualizar consulta',
                error: err.message
            });
        }
    },

    async deleteByConsulta(req, res) {
        const { consulta_id } = req.params;
        const { auth } = req.headers; // ID do usuário autenticado
    
        try {
            const consulta = await Consulta.findById(consulta_id);
            if (!consulta) {
                return res.status(404).send({ message: 'Consulta não encontrada' });
            }
    
            // Verifica se o usuário autenticado é o psicólogo responsável
            if (consulta.psicologo_id.toString() !== auth) {
                return res.status(403).send({ message: 'Somente o psicólogo responsável pode excluir esta consulta' });
            }
    
            await Consulta.findByIdAndDelete(consulta_id);
            return res.status(200).send({ message: 'Consulta excluída com sucesso' });
        } catch (err) {
            return res.status(400).send({
                message: 'Erro ao deletar consulta',
                error: err.message
            });
        }
    },

    async deleteAll(req, res) {    
        try {
            const result = await Consulta.deleteMany({});

            if(result.deletedCount > 0){
                return res.status(200).send({ 
                    message: 'Todas as consultas foram excluídas',
                    count: result.deletedCount });
            }
            else{
                return res.status(400).send({ message: 'Não há nehnuma consulta para deletar' })
            }
            
        } catch (err) {
            return res.status(400).send({
                message: 'Erro ao deletar todas as consultas',
                error: err.message
            });
        }
    }

};
