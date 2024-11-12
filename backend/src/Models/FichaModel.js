const mongoose = require('mongoose')

const fichaSchema = new mongoose.Schema({
    profession: {
        type: String,
        required: true,
    },
    education: {
        curso: {
            type: String,
            required: true,
        },
        periodo: {
            type: String,
            required: true,
        },
        turno: {
            type: String,
            enum: ['Manhã', 'Tarde', 'Noite'],
            required: true,
        },
        nivel: {
            type: String,
            enum: ['Fundamental I', 'Fundamental II', 'Ensino Médio', 'Ensino Técnico', 'Graduação', 'Pós Graduação'],
            required: true,
        },
    },
    preferredDay: {
        morning_monday: { type: Boolean, default: false },
        afternoon_tuesday: { type: Boolean, default: false },
        morning_wednesday: { type: Boolean, default: false },
        // Continue adicionando campos para cada dia/turno conforme necessário
    },
    vinculo: {
        type: String,
        enum: ['Docente', 'Agente', 'Acadêmico', 'Estagiário'],
        required: true,
    },
    externalCommunity: {
        type: Boolean,
        default: false,
    },
    work: {
        type: {
            type: String,
            enum: ['Trabalha', 'Não Trabalha'],
            required: true,
        },
        time: {
            type: String, // Exemplo: "08:00"
        },
    },
    psicologa: {
        type: {
            type: String,
            enum: ['Acompanha', 'Não Acompanha'],
            required: true,
        },
        time: {
            type: String, // Exemplo: "3 anos"
        },
    },
    psiquiatria: {
        type: {
            type: String,
            enum: ['Acompanha', 'Não Acompanha'],
            required: true,
        },
        time: {
            type: String, // Exemplo: "1 ano"
        },
    },
    observation: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    }
})

const ficha = mongoose.model('Ficha', fichaSchema)
module.exports = ficha
