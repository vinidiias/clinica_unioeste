const axios = require('axios');

async function isValidCPF(cpf, dataNascimento) {
    // Construa a URL substituindo o token e o CPF
    const url = URL_CPF
        .replace('${TOKEN}', TOKEN_CPF)
        .replace('${CPF}', cpf)
        .replace('${DATA_NASCIMENTO}', dataNascimento)

    try {
        const response = await axios.get(url)
        
        if (response.data.erro) {
            return null // Retorna null se houver um erro na resposta
        }
        
        return response.data // Retorna os dados se a consulta for bem-sucedida
    } catch (err) {
        console.error(err)// Loga o erro para depuração
        return null // Retorna null em caso de erro
    }
}

module.exports = { isValidCPF }