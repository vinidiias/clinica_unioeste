const mongoose = require('mongoose')

const acompanhamentoSchema = new mongoose.Schema({
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
});

const acompanhamento = mongoose.model('Acompanhamento', Schema)
module.exports = acompanhamento