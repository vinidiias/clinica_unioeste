const mongoose = require('mongoose')

const pessoaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: String,
        require: true,
    },
    data_nasc: {
        type: String,
        require: true,
    },
    sexo: {
        type: String, 
        require: true,
    },
    ra: {
        type: String, 
        require: true,
    },
    cpf: {
        type: String, 
        require: true,
    },
    telefone: {
        type: String, 
        require: true,
    },
    adrress: {
        adrres: {
            type: String, 
            require: true,
        }, 
        adrres_number:{
            type: String, 
            require: true,
        },
    },
    imagem: {
        type: String, // ou Buffer se você estiver armazenando os dados da imagem
        required: false // ou false, dependendo da sua necessidade
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model('Pessoa', pessoaSchema)