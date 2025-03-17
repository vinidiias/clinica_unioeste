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
        morning_monday: { type: Boolean, required: false },
        morning_tuesday: { type: Boolean, required: false },
        morning_wednesday: { type: Boolean, required: false },
        morning_thursday: { type: Boolean, required: false },
        morning_friday: { type: Boolean, required: false },
        afternoon_monday: { type: Boolean, required: false },
        afternoon_tuesday: { type: Boolean, required: false },
        afternoon_wednesday: { type: Boolean, required: false },
        afternoon_thursday: { type: Boolean, required: false },
        afternoon_friday: { type: Boolean, required: false },
        night_monday: { type: Boolean, required: false },
        night_tuesday: { type: Boolean, required: false },
        night_wednesday: { type: Boolean, required: false },
        night_thursday: { type: Boolean, required: false },
        night_friday: { type: Boolean, required: false }, 
    }
});

module.exports = mongoose.model('Consulta', ConsultaSchema);
