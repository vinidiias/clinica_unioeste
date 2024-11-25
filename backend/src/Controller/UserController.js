const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const { verifyEmail } = require('../Validations/emailValidation')
const { UserEmpty } = require('../Validations/emptyValidation')

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
        
        const { email, name, password, role } = req.body

        const flag = UserEmpty(email, name, password, role)
        if(flag) return res.status(400).send({ message: 'Campo vazio'})

        //if(!['paciente', 'psicologo'].includes(role)) return res.status(400).send({ message: 'Tipo de usuario invalido'})

        try{
            const emailIsValid = await verifyEmail(email)
            if(!emailIsValid) return res.status(400).send({ message: 'Email inválido' })

            const userAlreadyExists = await User.findOne({ email })
            if(userAlreadyExists) return res.status(400).send({ message: 'Usuário já existe' })
        
            const hashedPassword = await hashPassword(password)
        
            const createdUser = await User.create({
                email,
                name,
                password: hashedPassword,
                role,
                isFirstLogin: true // Define automaticamente como true na criação
            })

            return res.status(200).send(createdUser)

        } catch (err) {
            res.status(400).send(err)
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
    },

    async updateUser(req, res) {
        const { email, password, ...dadosAtualizado } = req.body
        const { user_id } = req.params
        const { auth } = req.headers
    
        if (user_id !== auth) return res.status(400).send({ message: 'Não autorizado' })

        const userAtual = await User.findById(user_id)
        if(!userAtual) return res.status(400).send({ message: 'Usuario nao encontrado' })
    
        try {
            // Verifica e valida email
            if (email) {
                const emailValido = await verifyEmail(email)
                if (!emailValido) return res.status(400).send({ message: 'Email inválido' })
    
                const emailExists = await User.findOne({ email, _id: { $ne: user_id } })
                if (emailExists) return res.status(400).send({ message: 'E-mail já está em uso' })
    
                dadosAtualizado.email = email
            }
    
            // Verifica e encripta a senha, se for alterada
            if (password) {
                const hashedPassword = await hashPassword(password)
                dadosAtualizado.password = hashedPassword
            }
    
            // Atualiza apenas os campos enviados no body
            Object.keys(dadosAtualizado).forEach((key) =>{
                if(dadosAtualizado[key] !== undefined && dadosAtualizado[key] !== '') {
                    userAtual[key] = dadosAtualizado[key]
                }
            })

            const userAtualizado = await userAtual.save()

            return res.status(200).send({ 
                message: 'Dados do usuario atualizado com sucesso',
                user: userAtualizado
            })
        }
        catch (err) {
            return res.status(400).send(err) // Certifique-se de que só envia uma resposta em caso de erro
        }
    }
    
}