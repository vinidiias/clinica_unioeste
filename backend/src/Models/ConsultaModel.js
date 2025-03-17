const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema({
    psicologo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referência ao modelo User
        required: true,
    },

    paciente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referência ao modelo User
        required: true,
    },

    agenda: {
        type: String,
        required: false,
    },

    horario: {
        type: String,
        required: false,
    }, 

    semana: {
        type: [String],  // 🔹 Agora `semana` será um array de strings
        required: false,
        default: []  // 🔹 Inicia como um array vazio
    }
    
});

module.exports = mongoose.model('Consulta', ConsultaSchema);
