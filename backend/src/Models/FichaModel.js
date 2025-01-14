const mongoose = require('mongoose')

const fichaSchema = new mongoose.Schema({
    profission: {
        type: String,
        required: true,
    },
    education: {
        curso: {
            type: String,
            required: false,
        },
        periodo: {
            type: String,
            required: false,
        },
        turno: {
            type: String,
            enum: ['Manhã', 'Tarde', 'Noite'],
            required: false,
        },
        type: {
            type: String,
            enum: ['Fundamental I', 'Fundamental II', 'Ensino Médio', 'Ensino Técnico', 'Graduação', 'Pós Graduação'],
            required: true,
        },
    },
    preferredDay: {
        morning_monday: { type: Boolean, default: false },
        morning_tuesday: { type: Boolean, default: false },
        morning_wednesday: { type: Boolean, default: false },
        morning_thursday: { type: Boolean, default: false },
        morning_friday: { type: Boolean, default: false },
        afternoon_monday: { type: Boolean, default: false },
        afternoon_tuesday: { type: Boolean, default: false },
        afternoon_wednesday: { type: Boolean, default: false },
        afternoon_thursday: { type: Boolean, default: false },
        afternoon_friday: { type: Boolean, default: false }, 
        night_monday: { type: Boolean, default: false },
        night_tuesday: { type: Boolean, default: false },
        night_wednesday: { type: Boolean, default: false },
        night_thursday: { type: Boolean, default: false },
        night_friday: { type: Boolean, default: false },      // Continue adicionando campos para cada dia/turno conforme necessário
    },
    vinculo: {
        type : {
            type: String,
            enum: ['Docente', 'Agente', 'Acadêmico', 'Estagiário', 'Sem Vínculo'],
            required: true,
            default: 'Sem Vínculo'
        },
        setor : {
            type: String,
            required: false,
        }
    },
    comunidade: {
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
    psiquiatra: {
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

    triagem: {
        type: Boolean,
        default: null
    },

    prioridade: {
        type: String,
        enum: ['baixa', 'media', 'alta', null],
        default: null
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