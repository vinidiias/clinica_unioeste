const exios = require('axios')

async function verifyCEP(cep) {
    try{
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        if (response.data.erro)
                return null
        
        return response.data
    }
    catch(err){
        return res.status(400).send(err)
    }
}

module.exports = { verifyCEP }