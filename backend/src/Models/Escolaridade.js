const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
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
  }
});

const Education = mongoose.model('Education', educationSchema);
module.exports = Education;
