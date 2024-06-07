const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apepat: {
        type: String,
        required: true
    },
    apemat: {
        type: String,
    },
    telefono: {
        type: String,
    },
    direccion: {
        type: String,
    },
    photo: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Persona', personaSchema);

