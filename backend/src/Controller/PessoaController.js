const Pessoa = require('../Models/Pessoa')
const { index } = require('./UserController')

module.exports ={
    async create (req,res) {
        const { img, name, age, sexo, birth, cpf, ra, email, phone, adressComplet} = req.body
        const { user_id } = req.params 
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'})
    
        try{
            const createPessoa = await Pessoa.create({
                img,
                name,
                age,
                sexo,
                birth,
                cpf,
                ra,
                email,
                phone,
                adressComplet,
                user: user_id
            })

            //await createPessoa.populate('user') //tras outras informacoes sobre o usurario

            return res.status(200).send(createPessoa)
        }
        catch(err){
            return res.status(400).send(err)
        }
    },
    
    async delete (req, res) {
        const { pessoa_id, user_id } = req.params
        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'})
        return

        try{
            const deletePesosa = await Pessoa.findByIdAndDelete(pessoa_id)
            return res.status(200).send({ status: 'deleted', user: deletePesosa})
        }
        catch(err){
            return res.status(400).send(err)
        }
    },
    
    async deleteAll(req, res) {
        try {
            // Deleta todas as pessoas
            const deletePessoas = await Pessoa.deleteMany({});
    
            // Verifica se houve alguma exclusão
            if (deletePessoas.deletedCount > 0) {
                return res.status(200).send({ status: 'deleted', count: deletePessoas.deletedCount });
            } else {
                return res.status(404).send({ status: 'no records found to delete' });
            }
        } catch (err) {
            return res.status(400).send(err);
        }
    }, 

    async indexByUser (req, res) {
        const { user_id } = req.params
        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'})
        
        try{
            const allPessoaOfUser = await Pessoa.find({
                user: user_id
            })
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
            const { id } = req.params 
            const dadosAtualizados = req.body

            const pessoaAtualizada = await Pessoa.findByIdAndUpdate(
                id, 
                
                { $set: dadosAtualizados },
                { new: true }

            );

            if(!pessoaAtualizada){
                return res.status(400).send({ message: "Pessoa nao encontrada"})
            }
            res.status(200).send({ message: "Dados atualizados com sucesso", pessoa: pessoaAtualizada })
        }
        catch(err){
            return res.status(400).send(err)
        }
    }

}