const mongoose = require('mongoose')

const fichaSchema = new mongoose.Schema({
    profission: {
        type: String,
        required: true,
    },
    education: {
        course: {
            type: String,
            required: false,
        },
        period: {
            type: String,
            required: false,
        },
        shift: {
            type: String,
            enum: ['Manhã', 'Tarde', 'Noite'],
            required: false,
        },
        level: {
            type: String,
            enum: ['Fundamental I', 'Fundamental II', 'Ensino Médio', 'Ensino Técnico', 'Graduação', 'Pós Graduação'],
            required: true,
        },
    },
    preferredDay: {      
    },
    vinculo_unioeste: {
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

    community: {
        type: String,
        enum: ['Sim', 'Não'],
        required: true,
    },

    work: {
        type: {
            type: String,
            enum: ['Sim', 'Não'],
            required: true,
        },
        schedule: {
            type: String, // Exemplo: "08:00"
        },
    },
    psychologist: {
        type: {
            type: String,
            enum: ['Sim', 'Não'],
            required: true,
        },
        schedule: {
            type: String, // Exemplo: "3 anos"
        },
    }, 

    psychiatric: {
        type: {
            type: String,
            enum: ['Sim', 'Não'],
            required: true,
        },
        schedule: {
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
        enum: ['Baixa', 'Média', 'Alta', null],
        default: null
    },

    status: {
        type: String,
        enum: ['Em avaliação', 'Avaliada', null],
        default: null,
    },

    agenda: {
        type: String,
        required: false,

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