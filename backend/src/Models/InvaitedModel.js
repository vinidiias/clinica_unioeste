const mongoose = require("mongoose")

const InvateSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },

    uniqueId: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: "7d"
    }
})

module.exports = mongoose.model("Convite", InvateSchema)