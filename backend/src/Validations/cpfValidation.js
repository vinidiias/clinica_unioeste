const axios = require('axios');

async function isValidCPF(cpf) {
    try {
        // Substitua {cpf} pelo CPF que você quer verificar
        const response = await axios.get(`https://apigateway.conectagov.estaleiro.serpro.gov.br/api-cpf-light/v2/consulta/cpf/${cpf}`, {
            headers: {
                'Authorization': `Bearer ${process.env.SERPRO_API_KEY}` // Exemplo de autenticação com token
            }
        });
        
        if (response.data.erro) {
            return null; // Retorna null se houver um erro na resposta
        }
        
        return response.data; // Retorna os dados se a consulta for bem-sucedida
    } catch (err) {
        console.error(err); // Loga o erro para depuração
        return null; // Retorna null em caso de erro
    }
}

module.exports = { isValidCPF };

