const mongoose = require('mongoose')

const vinculoSchema = new mongoose.Schema({
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
    }
});

const vinculo = mongoose.model('Vinculo', Schema)
module.exports = vinculo