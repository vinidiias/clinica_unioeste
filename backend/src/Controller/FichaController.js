const mongoose = require('mongoose')
const Ficha = require('../Models/FichaModel')
const { FicharioEmpty } = require('../Validations/emptyValidation')


module.exports = {
    async create(req, res) {
        const { profession,
            education,
            preferredDay,
            vinculo,
            externalCommunity,
            work,
            psicologa,
            psiquiatria,
            observation
        } = req.body;
        
        const { user_id } = req.params
        const { auth } = req.headers

        const flag = FicharioEmpty(profession, education, vinculo, work, psicologa, psiquiatria)
        if(flag) return res.status(400).send({ message: 'Campo vazio' })

        if( user_id !== auth) return res.status(400).send({ message: 'Não autorizado' })
    
        try {
            //Verificar se ja existe uma ficha assosciada ao usuario
            const existFicha = await Ficha.findOne({ user: user_id })
            if(existFicha) return res.status(400).send({ message: 'Ficha ja existe' })

            // Cria o documento usando o modelo Ficha
            const createFicha = await Ficha.create({
                profession, 
                education, 
                preferredDay,
                vinculo,
                externalCommunity,
                work,
                psicologa,
                psiquiatria,
                observation,
                user: user_id,
            })
            //console.log(createFicha)
            
            // Popula o campo 'user' com as informações do usuário associado (se houver relação no schema)
            const fichaComUser = await Ficha.findById(createFicha._id).populate('user')
            return res.status(200).send(fichaComUser)//tras outras informacoes sobre o usurario
            
        }
        catch (err) {
            return res.status(400).send(err)
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
    }, 
    
    async indexByUser (req, res) {
        const { user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'})

        try {
            const allFicharioUser = await Ficha.find({
                user: user_id
            })
            return res.status(200).send(allFicharioUser)    
        }
        catch (err){
            return res.status(400).send(err)
        }
    },

    async delete (req, res) {
        const { ficha_id, user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Não autorizado' })

        try {
            const deleteFichario = await Ficha.findByIdAndDelete(ficha_id)
            if(!deleteFichario) return res.status(400).send({ message: 'Fichario não encontrado' })
            
            return res.status(200).send({ message: 'Fichario deletado com sucesso' })
        }
        catch(err){
            return res.status(400).send({status: 'Ficha deletada com sucesso' })
        }
    },

    async deleteAll (req, res) {
        try{
            const deleteFicharios = await Ficha.deleteMany({})

            if(deleteFicharios.deletedCount > 0) {
                return res.status(200).send({ 
                    message: 'Todos deletados com sucesso', 
                    count: deleteFicharios.deletedCount })
            }
            else {
                return res.status(400).send({ message: 'Não há nehnuma ficha para deletar' })
            }
        }
        catch(err){
            return res.status(400).send(err)
        }
    }
}