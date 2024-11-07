const User = require('../Models/User')
const bcrypt = require('bcrypt')
const { verifyEmail } = require('../Validations/emailValidation')

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
            const emailIsValid = await verifyEmail(email)
            if(!emailIsValid) return res.status(400).send({ message: 'Email inválido' })

                
            const userAlreadyExists = await User.findOne({ email })
            if(userAlreadyExists) return res.status(400).send({ message: 'Usuário já existe' })
        
            const hashedPassword = await hashPassword(password)
        
            const createdUser = await User.create({
                email,
                name,
                password: hashedPassword,
                isFirstLogin: true // Define automaticamente como true na criação
            })

            return res.status(200).send(createdUser)

        } catch (err) {
            res.status(400).send(err);
        }
    },

    async delete(req, res){
        const { user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Nao autorizado'})
            
        try{
            const deletedUser = await User.findByIdAndDelete(user_id)
            return res.status(200).send({ status: 'deleted', user: deletedUser})
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