const { mongoose } = require('mongoose')
const nodemailer = require('nodemailer')
const Convite = require('../Models/InvaitedModel')
const bcrypt = require('bcrypt')
const User = require('../Models/UserModel')
const { v4: uuidv4 } = require('uuid');
const { UserEmpty } = require('../Validations/emptyValidation');
const { emailUnioeste} = require('../Validations/emailValidation')

module.exports = {
    async invited(req, res) {
        const { email, role } = req.body; // Recebe o papel (psicologo ou admin) no body
        const uniqueId = uuidv4();
    
        // Validação do papel
        const validRoles = ['psicologo', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).send({ message: 'Role inválido' });
        }
    
        const existingInvite = await Convite.findOne({ email });
        if (existingInvite)
            return res.status(400).send({ message: 'Este email já recebeu um convite' });
    
        try {
            const isEmailValied = await emailUnioeste(email);
            if (!isEmailValied)
                return res.status(400).send({ message: 'Email inválido' });
    
            require('dotenv').config();
    
            const userEmail = process.env.USER_EMAIL;
            const pass = process.env.PASS;
            const baseURL = role === 'admin' ? process.env.TEXT_ADMIN : process.env.TEXT_PSY;
    
            const fullLink = `${baseURL}?email=${email}&id=${uniqueId}`;
    
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: userEmail,
                    pass: pass,
                },
            });
    
            await transporter.verify();
    
            const mailOptions = {
                from: userEmail,
                to: email,
                subject: `Convite para ativar sua conta como ${
                    role === 'admin' ? 'administrador' : 'psicólogo'
                } no sistema da Unioeste`,
                html: `
                    <p>Para ativar sua conta como ${
                        role === 'admin' ? 'administrador' : 'psicólogo'
                    } no sistema Unioeste, clique no link abaixo: </p> 
                    <a href="${fullLink}" target="_blank">Clique aqui</a>
                    `,
            };
    
            const info = await transporter.sendMail(mailOptions);
            console.log('Email enviado com sucesso', info.response);
    
            await Convite.create({ email, uniqueId, role }); // Salva o papel no banco de dados
    
            return res.status(200).send({message: 'Convite enviado com sucesso' });
        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    },

    async validated (req, res) {
        const { email, id } = req.body

        try{
            const isEmailValied = await emailUnioeste(email)
            if(!isEmailValied) return res.status(400).send({ message: 'Email invalido'})

            const invite = await Convite.findOne({email, uniqueId: id})

            if(!invite) return res.status(400).send({ message: 'Convite invalido'})

            return res.status(200).send({ message: 'Convite valido'})
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

        const isEmpty = UserEmpty(email, name, password)
        if(isEmpty) return res.status(400).send({ message: 'Campo vazio'})

        try{
            const isEmailValied = await emailUnioeste(email)
            if(!isEmailValied) return res.status(400).send({ message: 'Email invalido'})

            const invite = await Convite.findOne({ email, uniqueId: id})
            if(!invite) return res.status(400).send({ message: 'Convite invalido'})

            const hashedPassword = await bcrypt.hash(password, 10)

            const psyCreated = await User.create({ 
                email, 
                name,
                password: hashedPassword, 
                role: 'psicologo'
            })

            await Convite.deleteOne({ email, uniqueId: id})

            return res.status(200).send({ 
                message: 'Conta de psicologo criada com sucesso',
                psicologa: psyCreated
            })
        }
        catch(err){
            return res.status(400).send(err)
        }
    },

    async registerAdmin (req, res) {
        const { email, name, password, id } = req.body

        const existingUser = await User.findOne({ email })
        if(existingUser) return res.status(400).send({ message: 'Usuario ja existe'})

        const isEmpty = UserEmpty(email, name, password)
        if(isEmpty) return res.status(400).send({ message: 'Campo vazio'})

        try{
            const isEmailValied = await emailUnioeste(email)
            if(!isEmailValied) return res.status(400).send({ message: 'Email invalido'})

            const invite = await Convite.findOne({ email, uniqueId: id})
            if(!invite) return res.status(400).send({ message: 'Convite invalido'})

            const hashedPassword = await bcrypt.hash(password, 10)

            const adminCreated = await User.create({ 
                email, 
                name, 
                password: hashedPassword, 
                role: 'admin'})

            await Convite.deleteOne({ email, uniqueId: id})

            return res.status(400).send({ 
                message: 'Conta de administrador criada com sucesso',
                administrador: adminCreated
            })
        }
        catch(err){
            return res.status(400).send(err)
        }
    }
}