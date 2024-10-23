const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    trabalha: {
      type: Boolean,
      required: true
    },
    horario: {
      type: String,
      required: function() {
        return this.trabalha;
      }
    }
});

const Profissao = mongoose.model('Profissao', Schema)
module.exports = Profissao
