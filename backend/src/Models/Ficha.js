const mongoose = require('mongoose')

const fichaSchema = new mongoose.Schema({
    profissao: {
        type: String,
        require: true
    },
    escolaridade: {
        type: String,
        enum: ['Fundamental I', 'Fundamental II', 'Ensino Médio', 'Ensino Técnico', 'Graduação', 'Pós Graduação'],
        required: true
      },
      curso: {
        type: String,
        required: function() {
          // O campo 'curso' é obrigatório se a escolaridade for 'Graduação' ou 'Pós Graduação'
          return this.escolaridade === 'Graduação' || this.escolaridade === 'Pós Graduação';
        }
      },
      anoPeriodo: {
        type: String,
        required: function() {
          // O campo 'anoPeriodo' também é obrigatório se 'Graduação' ou 'Pós Graduação' forem selecionados
          return this.escolaridade === 'Graduação' || this.escolaridade === 'Pós Graduação';
        }
      },
      turno: {
        type: String,
        enum: ['Manhã', 'Tarde', 'Noite'],
        required: true
      },
      dia: {
        type: String,
        enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        required: true
    },
    turno: {
        type: String,
        enum: ['Manhã', 'Tarde', 'Noite'],
        required: true
    },
    vinculo: {
        type: String,
        enum: ['Docente', 'Agente', 'Acadêmico', 'Estagiário', 'Nenhum'],
        required: function() {
          return !this.comunidadeExterna;
        }  // Esse campo é obrigatório apenas se não for Comunidade Externa
      },
      setor: {
        type: String,
        required: function() {
          return this.vinculo === 'Agente';
        }  // Campo setor aparece apenas se o vínculo for "Agente"
      },
      comunidadeExterna: {
        type: Boolean,
        default: false
      },
      trabalha: {
        type: Boolean,
        required: true
      },
      horario: {
        type: String,
        required: function() {
          return this.trabalha;
        }
      },
      acompanhamentoPsicologico: {
        realizado: {
          type: Boolean,
          required: true
        },
        tempo: {
          type: String,
          required: function() {
            return this.acompanhamentoPsicologico.realizado;
          }  // Só pede o tempo se tiver realizado acompanhamento psicológico
        }
      },
      acompanhamentoPsiquiatrico: {
        realizado: {
          type: Boolean,
          required: true
        },
        tempo: {
          type: String,
          required: function() {
            return this.acompanhamentoPsiquiatrico.realizado;
          }  // Só pede o tempo se tiver realizado acompanhamento psiquiátrico
        }
      }
})
const ficha = mongoose.model('Ficha', fichaSchema)
module.exports = ficha
