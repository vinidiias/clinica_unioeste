const { mongoose } = require('mongoose')
const Pessoa = require('../Models/PessoaModel')
const User = require('../Models/UserModel')
const { isValidCPF } = require('../Validations/cpfValidation')
const { calcularIdade } = require('../Validations/dataValidation')
const { index } = require('./UserController')
const { PessoaEmpty } = require('../Validations/emptyValidation')

module.exports ={
    async create (req,res) {
        const { img, sexo, birth, cpf, ra, phone, adressComplet} = req.body
        const { user_id } = req.params 
        const { auth } = req.headers

        const flag = PessoaEmpty(sexo, birth, cpf, ra, phone, adressComplet)
        if(flag) return res.status(400).send({ message: 'Campo vazio'})

        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'})
    
        try{
            
            const userExists = await User.findById(user_id) //verifica se o usuario existe
            if(!userExists) return res.status(400).send({ message: 'Usuário não encontrado'})

            const existPessoa = await Pessoa.findOne({ user: user_id }) //verifica se ja existe uma pessoa cadastrada
            if(existPessoa) return res.status(400).send({ message: 'Pessoa já está cadastrada'})

            const cpfIsValid = await isValidCPF(cpf) //verifica se o cpf é valido
            if(!cpfIsValid) return res.status(400).send({ message: 'CPF inválid' })

            const age = calcularIdade(birth) // calcula a idade da pessoa pela dada de nascimento
            
            const createPessoa = await Pessoa.create({
                img,
                age,
                sexo,
                birth,
                cpf,
                ra,
                phone,
                adressComplet,
                user: user_id,
            })

            userExists.isFirstLogin = false;
            await userExists.save();

            const pessoaComUser = await Pessoa.findById(createPessoa._id).populate('user');            
 
            return res.status(200).send({
                pessoa: createPessoa,
                message: 'Pessoa criada com sucesso!'
            })
        }
        catch(err){
            return res.status(400).send(err)
        }
    },
    
    async delete (req, res) {
        const { pessoa_id, user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Não autorizado'})
        
       

        try{
            const deletePesosa = await Pessoa.findByIdAndDelete(pessoa_id)
            if(!deletePesosa) return res.status(400).send({ message: 'Pessoa não encontrada'})
                
            return res.status(200).send({ status: 'Deletado com sucesso', user: deletePesosa})
        }
        catch(err){
            return res.status(400).send(err)
        }
    },
    
    async deleteAll(req, res) {
        try {
            // Deleta todas as pessoas
            const deletePessoas = await Pessoa.deleteMany({})
    
            // Verifica se houve alguma exclusão
            if (deletePessoas.deletedCount > 0) {
                return res.status(200).send({ status: 'deleted', count: deletePessoas.deletedCount })
            } else {
                return res.status(404).send({ status: 'no records found to delete' })
            }
        } catch (err) {
            return res.status(400).send(err)
        }
    }, 

    async indexByUser (req, res) {
        const { user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Não autorizado'})
        
        try{
            const allPessoaOfUser = await Pessoa.find({
                user: user_id
            })


            allPessoaOfUser[0].age = calcularIdade(allPessoaOfUser[0].birth) // calcula a idade da pessoa pela dada de nascimento

            return res.status(200).send(allPessoaOfUser)
        } catch (err) {
            return res.status(400).send(err);
        }
    },


    async indexAll (req, res) {
        try{
            const allPessoa = await Pessoa.find().populate('user')
            return res.status(200).send(allPessoa)
        }
        catch(err){
            return res.status(400).send(err)
        }
    }, 

    async updatePessoa (req, res){
        try{
            const dadosAtualizados = req.body
            const { user_id } = req.params 
            const { auth } = req.headers

            if(user_id !== auth) return res.status(400).send({ message: 'Não autorizado'})

            if(dadosAtualizados.birth) {
                dadosAtualizados.age = calcularIdade(dadosAtualizados.birth) // calcula a idade da pessoa pela dada de nascimento
            }

            const pessoaAtualizada = await Pessoa.findOneAndUpdate(
                {user: user_id}, 
                
                { $set: dadosAtualizados },
                { new: true }

            );

            if(!pessoaAtualizada){
                return res.status(400).send({ message: "Pessoa não encontrada"})
            }
            res.status(200).send({ message: "Dados atualizados com sucesso", pessoa: pessoaAtualizada })
        }
        catch(err){
            return res.status(400).send(err)
        }
    }
}