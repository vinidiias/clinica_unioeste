const mongoose = require('mongoose')
const Ficha = require('../Models/FichaModel')
const { FicharioEmpty } = require('../Validations/emptyValidation')
const User = require('../Models/UserModel')
const Pessoa = require('../Models/PessoaModel')


module.exports = {
    async create(req, res) {

        const {  
            profission, education, preferred_day, vinculo_unioeste, community, work, psychologist, psychiatric, observation } = req.body;
        
        const { user_id } = req.params
        const { auth } = req.headers

        const flag = FicharioEmpty(profission, education, vinculo_unioeste, work, psychologist, psychiatric)

        if(flag) return res.status(400).send({ message: 'Campo vazio' })

        if( user_id !== auth) return res.status(400).send({ message: 'Não autorizado' })
    
        try {
            //Verificar se ja existe uma ficha assosciada ao usuario
            const existFicha = await Ficha.findOne({ user: user_id })
            if(existFicha) return res.status(400).send({ message: 'Ficha ja existe' })

            // Cria o documento usando o modelo Ficha
            const createFicha = await Ficha.create({
                profission,
                education,
                preferred_day,
                vinculo_unioeste,
                community,
                work,
                psychologist,
                psychiatric,
                observation,
                user: user_id
            })
            //console.log(createFicha)
            
            // Popula o campo 'user' com as informações do usuário associado (se houver relação no schema)
            const fichaComUser = await Ficha.findById(createFicha._id).populate('user') //tenta adicionar pessoas tmb sem ser o populate

            fichaComUser.triagem = true

            await fichaComUser.save()

            return res.status(200).send(fichaComUser)//tras outras informacoes sobre o usurario
            
        }
        catch (err) {
            return res.status(400).send(err)
        }
    }, 

    async indexAll (req, res) {
        try{
            const allFichario = await Ficha.find().populate('user')

            const result = await Promise.all(
                allFichario.map(async (ficha) => {
                    const pessoa = await Pessoa.findOne({ user: ficha.user._id})

                    return {
                        ficha,
                        pessoa
                    }
                })
            )
            return res.status(200).send(result)

        }
        catch(err){
            console.log(err)
            return res.status(400).send(err)
        }
    }, 
    
    async indexByUser (req, res) {
        const { user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'})

        try {
            const allFicharioUser = await Ficha.findOne({ user: user_id })
            
            const user = await User.findById(user_id)
            const pessoa = await Pessoa.findOne({ user: user_id})

            return res.status(200).send({
                ficha: allFicharioUser,
                user: user,
                pessoa: pessoa
            })    
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