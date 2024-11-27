const { mongoose } = require('mongoose')
const Convite = require('../Models/InvaitedModel')
const bcrypt = require('bcrypt')
const User = require('../Models/UserModel')
const { v4: uuidv4 } = require('uuid');
const { UserEmpty } = require('../Validations/emptyValidation');
const { emailUnioeste} = require('../Validations/emailValidation')

module.exports = {
    async invited (req, res) {
        const { email } = req.body

        const existingInvite = await Convite.findOne({ email })
        if(existingInvite) return res.status(400).send({ message: 'Este email ja recebeu um convite'})

        try {
            const isEmailValied = await emailUnioeste(email)
            if(!isEmailValied) return res.status(400).send({ message: 'Email invalido'})

            const uniqueId = uuidv4()

            await Convite.create({ email, uniqueId })

            return res.status(200).send({ 
                message: 'Convite enviado com sucesso',
                uniqueId
            })
        }
        catch(err){
            console.log(err)
            return res.status(400).send(err)
        }
    },

    async validated (req, res) {
        const { email, id } = req.body

        try{
            const isEmailValied = await emailUnioeste(email)
            if(!isEmailValied) return res.status(400).send({ message: 'Email invalido'})

            const invite = await Convite.findOne({email, uniqueId: id})

            if(!invite) return res.status(400).send({ message: 'Convite invalido'})

            return res.status(200).send({ message: 'Deu certo'})
        }
        catch(err){
            console.log(err)
            return res.status(400).send(err)
        }
    },

    async register (req, res)  {
        const { email, name, password, id } = req.body

        const existingUser = await User.findOne({ email })
        if(existingUser) return res.status(400).send({ message: 'Usuario ja existe'})

        const isEmpty = UserEmpty(email, name, password, "psicologo")
        if(!isEmpty) return res.status(400).send({ message: 'Campo vazio'})

        try{
            const isEmailValied = await emailUnioeste(email)
            if(!isEmailValied) return res.status(400).send({ message: 'Email invalido'})

            const invite = await Convite.findOne({ email, uniqueId: id})
            if(!invite) return res.status(400).send({ message: 'Convite invalido'})

            const hashedPassword = await bcrypt.hash(password, 10)

            await User.create({ email, name, password: hashedPassword})

            await Convite.deleteOne({ email, uniqueId: id})

            return res.status(400).send({ message: 'Conta criada com sucesso'})
        }
        catch(err){
            return res.status(400).send(err)
        }
    }
}