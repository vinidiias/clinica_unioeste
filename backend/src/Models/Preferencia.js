const mongoose = require('mongoose')

const preferenciaSchema = new mongoose.Schema ({
  
    dia: {
        type: String,
        enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        required: true
    },
    turno: {
        type: String,
        enum: ['Manhã', 'Tarde', 'Noite'],
        required: true
    }
});

const preferencia = mongoose.model('Preferencia', preferenciaSchema)
module.exports = preferencia
