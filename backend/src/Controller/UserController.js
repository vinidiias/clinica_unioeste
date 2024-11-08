const User = require('../Models/User')
const bcrypt = require('bcrypt')
const { verifyEmail } = require('../Validations/emailValidation')
const axios = require('axios')

async function hashPassword(password) {
    try{
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword
    }catch(err){
        return err
    }
}

module.exports = {
    async create(req, res) {
        
        const { email, name, password } = req.body

        try{
            const response = await axios.post('https://clinica-unioeste.vercel.app/api/verify-email', { email });
            const emailIsValid = response.data.valid;
    
            if (!emailIsValid) {
                return res.status(400).send({ message: 'Email inválido' });
            }
    
            // Verifica se o usuário já existe
            const userAlreadyExists = await User.findOne({ email });
            if (userAlreadyExists) {
                return res.status(400).send({ message: 'Usuário já existe' });
            }
    
            // Criptografa a senha
            const hashedPassword = await hashPassword(password);
    
            // Cria o novo usuário
            const createdUser = await User.create({
                email,
                name,
                password: hashedPassword,
                isFirstLogin: true // Define automaticamente como true na criação
            });
    
            return res.status(200).send(createdUser);
    
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Erro ao criar usuário', error: err.message });
        }
    },

    async delete(req, res){
        const { user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'})
            
        try{
            const deletedUser = await User.findByIdAndDelete(user_id)
            if(!deletedUser) return res.status(400).send({ message: 'Usuário não encontrado'})

            return res.status(200).send({ status: 'Deletado com sucesso', user: deletedUser})
        }
        catch(err){
            return res.status(400).send(err)
        }
    },

    async index(req, res){
        try {
            const allUsers = await User.find()
            return res.status(200).send(allUsers)
        }
        catch(err){
            return res.status(400).send(err)
        }
    }
}