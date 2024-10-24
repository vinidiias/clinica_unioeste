const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,  
        lowercase: true,
    },
    name: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        required: true,  
    }
});

// Exportando o modelo usando userSchema
module.exports = mongoose.model('User', userSchema);
