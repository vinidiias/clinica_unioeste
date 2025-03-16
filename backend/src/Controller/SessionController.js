const { ReturnDocument } = require('mongodb')
const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')

module.exports = {
    async create(req, res) { 
    const { email, password } = req.body;
   
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const response = {
            message: user.isFirstLogin 
                ? 'Seja Bem-vindo, por favor complete seu cadastro' 
                : 'Login realizado com sucesso',
            firstLogin: user.isFirstLogin,
            email: user.email,
            user: user.name,
            role: user.role,
            user_id: user._id
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ 
            message: 'Internal server error',
            error: err.message });
    }
}
}
