const { ReturnDocument } = require('mongodb')
const User = require('../Models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async create(req, res) { 
        const { email, password } = req.body;
       
        try {
            const userExists = await User.findOne({ email });
            if (!userExists) return res.status(400).send({ message: 'User does not exist' });
    
            const validPassword = await bcrypt.compare(password, userExists.password);
            if (!validPassword) return res.status(400).send({ message: 'Invalid password' });
    
            // Verifica o valor de `isFirstLogin`
            if (userExists.isFirstLogin) {
                return res.status(200).json({
                    message: 'Seja Bem-vindo, por favor complete seu cadastro',
                    firstLogin: true, // Informa que é o primeiro login
                    email: userExists.email,
                    user: userExists.name,
                    user_id: userExists._id
                });
            }
    
            // Se não for o primeiro login, permite o acesso direto
            return res.status(201).json({
                message: 'Login realizado com sucesso',
                firstLogin: false, // Indica que não é o primeiro login
                email: userExists.email,
                user: userExists.name,
                user_id: userExists._id
            });
    
        } catch (err) {
            return res.status(400).send(err);
        }
    }    
}
