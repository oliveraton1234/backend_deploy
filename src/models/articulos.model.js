const mongoose = require('mongoose');

const articuloSchema = new mongoose.Schema({
    nombre_articulo: {
        type: String,
        required: true
    },
    descripcion_articulo: {
        type: String,
        required: true
    },
    precioUnitario: {
        type: Number,
        default: 0
    },
    unidadMedida: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Articulo', articuloSchema);

