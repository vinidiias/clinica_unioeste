const mongoose = require('mongoose')

const pessoaSchema = new mongoose.Schema({
    birth: {
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

    phone: {
        type: String, 
        require: true,
    },

    adressComplet: {
        adress: {
            type: String, 
            require: true,
        },  
        
        number:{
            type: String, 
            require: true,
        },
    },

    img: {
        type: String, // ou Buffer se você estiver armazenando os dados da imagem
        require: false // ou false, dependendo da sua necessidade
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model('Pessoa', pessoaSchema)