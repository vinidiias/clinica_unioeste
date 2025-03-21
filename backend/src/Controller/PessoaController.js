const { mongoose } = require('mongoose')
const Pessoa = require('../Models/PessoaModel')
const User = require('../Models/UserModel')
const { isValidCPF } = require('../Validations/cpfValidation')
const { verifyDate } = require('../Validations/dataValidation')
const { PessoaEmpty } = require('../Validations/emptyValidation')
const { isValidPhoneNumber } = require('../Validations/phoneValidation')

module.exports ={
    async create (req,res) {
        const { img, sexo, birth, cpf, ra, phone, addressComplet} = req.body;
        const { user_id } = req.params;
        const { auth } = req.headers;

        const flag = PessoaEmpty(sexo, birth, cpf, ra, phone, addressComplet);
        if(flag) return res.status(400).send({ message: 'Campo vazio'});

        const userExists = await User.findById(user_id) 
        if(!userExists) return res.status(400).send({ message: 'Usuário não encontrado'});

        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'});

        const existPessoa = await Pessoa.findOne({ user: user_id });
        if(existPessoa) return res.status(400).send({ message: 'Pessoa já está cadastrada'});
    
        try{
            const cpfIsValid = await isValidCPF(cpf);
            if(!cpfIsValid) return res.status(400).send({ message: 'CPF inválid' });

            const dataValida = await verifyDate(birth);
            if(!dataValida) return res.status(400).send({ message: 'Data invalida'});

            const phoneValid = await isValidPhoneNumber(phone);
            if(!phoneValid) return res.status(400).send({ message: 'Telefone invalido'});


            const createPessoa = await Pessoa.create({
                img,
                sexo,
                birth,
                cpf,
                ra,
                phone,
                addressComplet,
                user: user_id, 
            });
            
            userExists.isFirstLogin = false;
            await userExists.save();

            const pessoaComUser = await Pessoa.findById(createPessoa._id).populate('user');
            return res.status(200).send({
                pessoa: createPessoa,
                message: 'Pessoa cadastrada com sucesso'
            });
        }
        catch(err){
            res.status(400).send({
                message: "Erro ao criar pessoa",
                error: err.message 
            })
        }
    },
    
    async delete (req, res) {
        const { pessoa_id, user_id } = req.params;
        const { auth } = req.headers;

        if(user_id !== auth) return res.status(400).send({ message: 'Não autorizado'});
        
        try{
            const deletePesosa = await Pessoa.findByIdAndDelete(pessoa_id);
            if(!deletePesosa) return res.status(400).send({ message: 'Pessoa não encontrada'});
                
            return res.status(200).send({ status: 'Deletado com sucesso', user: deletePesosa});
        }
        catch(err){
            res.status(400).send({
                message: "Erro ao deletar pessoa",
                error: err.message 
            });
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
            res.status(400).send({
                message: "Erro ao deletar pessoas",
                error: err.message 
            });
        }
    }, 

    async indexByUser (req, res) {
        const { user_id, pessoa_id } = req.params; // Pode vir um dos dois IDs
        const { auth } = req.headers;
    
        if (user_id !== auth) {
            return res.status(400).send({ message: 'Não autorizado' });
        }
    
        try {
            let pessoa;
    
            // Se o ID da Pessoa for informado, busca pelo _id
            if (pessoa_id) {
                console.log("Buscando pessoa pelo ID:", pessoa_id);
                pessoa = await Pessoa.findById(new mongoose.Types.ObjectId(pessoa_id)).populate('user', 'name email role');
            }
            // Caso contrário, busca pelo user_id
            else if (user_id) {
                console.log("Buscando pessoa pelo user_id:", user_id);
                pessoa = await Pessoa.findOne({ user: user_id }).populate('user', 'name email role');
            }
    
            // Se nenhuma pessoa foi encontrada, retorna 404
            if (!pessoa) {
                return res.status(404).send({ message: 'Nenhuma informação encontrada para este usuário ou pessoa' });
            }
    
            return res.status(200).send(pessoa);
        } catch (err) {
            console.error("Erro ao buscar pessoa:", err);
            return res.status(500).send({
                message: "Erro ao listar informações da pessoa",
                error: err.message
            });
        }
    },

    async indexAll (req, res) {
        try{
            const allPessoa = await Pessoa.find().populate('user');
            return res.status(200).send(allPessoa);
        }
        catch(err){
            res.status(400).send({
                message: "Erro ao listar as pessoas",
                error: err.message 
            });
        }
    }, 

    async updatePessoa (req, res){
        const {cpf, birth, phone, ...dadosAtualizado} = req.body
        const { user_id} = req.params 
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Não autorizado' });

        const PessoaAtual = await Pessoa.findOne({ user: user_id})
        if(!PessoaAtual) return res.status(400).send({ message: 'Usuario nao encontrado' });

        try{              
            if(cpf){
                const cpfIsValid = await isValidCPF(cpf);
                if(!cpfIsValid) return res.status(400).send({ message: 'CPF inválid' });
                PessoaAtual.cpf = cpf;
            }
            
            if(birth){
                const dataValida = await verifyDate(birth);
                if(!dataValida) return res.status(400).send({ message: 'Data invalida' });
                PessoaAtual.birth = birth;
            }

            if(phone){
                const phoneValid = await isValidPhoneNumber(phone);
                if(!phoneValid) return res.status(400).send({ message: 'Telefone invalido' });
                PessoaAtual.phone = phone;
            }

            // Atualiza apenas os campos enviados no body
            Object.keys(dadosAtualizado).forEach((key) =>{
                if(dadosAtualizado[key] !== undefined && dadosAtualizado[key] !== '') {
                    PessoaAtual[key] = dadosAtualizado[key]
                }
            })

            const PessoaAtualizado = await PessoaAtual.save();

            return res.status(200).send({ 
                message: 'Dados da pesosa atualizado com sucesso',
                pessoa: PessoaAtualizado
            });
        } 
        catch(err){
            res.status(400).send({
                message: "Erro ao atualizar pessoas",
                error: err.message 
            });
        }
    }
}