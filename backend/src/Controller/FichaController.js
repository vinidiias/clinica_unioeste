const mongoose = require('mongoose')
const Ficha = require('../Models/FichaModel')
const { FicharioEmpty } = require('../Validations/emptyValidation')
const User = require('../Models/UserModel')
const Pessoa = require('../Models/PessoaModel')
const Consulta = require('../Models/ConsultaModel')


module.exports = {
    async create(req, res) {

        const {  profission, education, preferredDay, vinculo_unioeste, community, work, psychologist, psychiatric, observation } = req.body;

        
        const { user_id } = req.params;
        const { auth } = req.headers;

        const flag = FicharioEmpty(profission, education, vinculo_unioeste, work, psychologist, psychiatric);

        if(flag) return res.status(400).send({ message: 'Campo vazio' });

        if( user_id !== auth) return res.status(400).send({ message: 'Não autorizado' });
    
        try {
            //Verificar se ja existe uma ficha assosciada ao usuario
            const existFicha = await Ficha.findOne({ user: user_id });
            if(existFicha) return res.status(400).send({ message: 'Ficha ja existe' });


            // Cria o documento usando o modelo Ficha
            const createFicha = await Ficha.create({
                profission,
                education,
                preferredDay,
                vinculo_unioeste,
                community,
                work,
                psychologist,
                psychiatric,
                observation,
                user: user_id,

            });
            //console.log(createFicha)
            
            // Popula o campo 'user' com as informações do usuário associado (se houver relação no schema)
            const fichaComUser = await Ficha.findById(createFicha._id).populate('user'); //tenta adicionar pessoas tmb sem ser o populate

            fichaComUser.triagem = true;
            fichaComUser.status = 'Em avaliação';

            await fichaComUser.save();

            return res.status(200).send(fichaComUser);//tras outras informacoes sobre o usurario
            
        }
        catch (err) {
            res.status(400).send({
                message: "Erro ao criar a ficha",
                error: err.message 
            });
        }
    }, 

    async indexAll (req, res) {
            try {
                // Busca todas as fichas no banco de dados
                const fichas = await Ficha.find();
        
                if (!fichas || fichas.length === 0) {
                    return res.status(404).send({ message: 'Nenhuma ficha encontrada' });
                }
        
                const resultados = await Promise.all(
                    fichas.map(async (ficha) => {
                        const user = await User.findById(ficha.user);
                        const pessoa = await Pessoa.findOne({ user: ficha.user });
        
                        return {
                            ficha: ficha,
                            pessoa: pessoa,
                            user: user
                        };
                    })
                );
        
                return res.status(200).send(resultados);
            } catch (err) {
                res.status(500).send({
                    message: "Erro ao listar todas as fichas",
                    error: err.message 
                });
            }
        }, 
    
    async indexByUser (req, res) {
        const { user_id } = req.params;
        const { auth } = req.headers;

        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'});

        try {
            const allFicharioUser = await Ficha.findOne({ user: user_id });
            
            const user = await User.findById(user_id);
            const pessoa = await Pessoa.findOne({ user: user_id});

            return res.status(200).send({
                ficha: allFicharioUser,
                pessoa: pessoa,
                user: user
            });    
        }
        catch (err){
            res.status(400).send({
                message: "Erro ao listar seu fichario",
                error: err.message 
            });
        }
    },

    async delete (req, res) {
        const { ficha_id, user_id } = req.params;
        const { auth } = req.headers;

        if(user_id !== auth) return res.status(400).send({ message: 'Não autorizado' });

        try {
            const deleteFichario = await Ficha.findByIdAndDelete(ficha_id);
            if(!deleteFichario) return res.status(400).send({ message: 'Fichario não encontrado' });
            
            return res.status(200).send({ message: 'Fichario deletado com sucesso' });
        }
        catch(err){
            res.status(400).send({
                message: "Erro ao delatar o fichario",
                error: err.message 
            });
        }
    },

    async deleteAll (req, res) {
        try{
            const deleteFicharios = await Ficha.deleteMany({});

            if(deleteFicharios.deletedCount > 0) {
                return res.status(200).send({ 
                    message: 'Todos deletados com sucesso', 
                    count: deleteFicharios.deletedCount })
            }
            else {
                return res.status(400).send({ message: 'Não há nehnuma ficha para deletar' });
            }
        }
        catch(err){
            res.status(400).send({
                message: "Erro ao deletar todas as fichas",
                error: err.message 
            });
        }
    },

    // Avaliar ficha e definir prioridade
    async prioridadeFicha(req, res) {
        const { ficha_id, psico_id, paci_id } = req.params;
        const { prioridade, agenda } = req.body;
        const { auth } = req.headers;

        try {
            const psico = await User.findById(psico_id);
            if (!psico) return res.status(400).send({ message: 'Psicólogo não encontrado' });
            if (psico.role !== 'psicologo') return res.status(400).send({ message: 'Somente psicólogos podem definir a prioridade' });

            const paciente = await User.findById(paci_id);
            if (!paciente) return res.status(400).send({ message: 'Paciente não encontrado' });
            if (paciente.role !== 'paciente') return res.status(400).send({ message: 'O ID fornecido não pertence a um paciente' });

            if (psico_id !== auth) return res.status(403).send({ message: 'Não autorizado' });

            if (!['Baixa', 'Média', 'Alta'].includes(prioridade)) return res.status(400).send({ message: 'Prioridade inválida' });
            
            const ficha = await Ficha.findById(ficha_id);
            if (!ficha) return res.status(400).send({ message: 'Ficha não encontrada' });

            if (ficha.user !== paci_id) return res.status(400).send({ message: 'Ficha não pertence ao paciente informado' });

            const consulta = await Consulta.findById(paci_id);
            if(!consulta) return res.status(400).send({ message: 'Paciente nao tem consulta' })
            

            // Define a prioridade e altera o status para 'Avaliada'
            ficha.prioridade = prioridade;
            ficha.status = 'Avaliada';
            ficha.triagem = false;

            consulta.agenda = agenda;

            await ficha.save();
            await consulta.save();


            return res.status(200).send({ 
                message: 'Prioridade definida com sucesso', 
                ficha 
            });

        } catch (err) {
            return res.status(400).send({ 
                message: 'Erro ao avaliar ficha', 
                error: err.message 
            });
        }
    },
}