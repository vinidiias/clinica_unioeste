const axios = require('axios');

// Função para verificar o formato do email
function isValidEmailFormat(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função serverless para verificar o email
module.exports = async (req, res) => {
    const { email } = req.body // Supõe que o email vem no corpo da requisição

    if (!isValidEmailFormat(email)) {
        return res.status(400).json({ message: 'Formato de email inválido' });
    }

    const url = `${process.env.URL_EMAIL}?email=${email}&api_key=${process.env.EMAIL_KEY}`

    try {
        const response = await axios.get(url)
        const isValid = response.data.data.status === 'valid'
        return res.status(200).json({ valid: isValid })
    } catch (err) {
        console.error('Erro ao verificar o email:', err.message)
        return res.status(500).json({ message: 'Erro ao verificar email' })
    }
}


module.exports = { isValidEmailFormat, verifyEmail }