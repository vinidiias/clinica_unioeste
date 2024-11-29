const User = require('../Models/UserModel');

async function isPsicologo(req, res, next) {
    const { user_id } = req.params; // Supondo que você tenha o user_id na URL

    try {
        const user = await User.findById(user_id);

        if (!user) return res.status(400).send({ message: 'Usuário não encontrado' });
        if (user.role !== 'psicologo') return res.status(403).send({ message: 'Acesso restrito a pscicologos' });

        next(); // Se for admin, continua para a próxima função
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Erro ao verificar pscicologos' });
    }
}

module.exports = isPsicologo;
