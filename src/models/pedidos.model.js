// models/Pedido.js
const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    articulos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articulo',
        required: true
    }]
}, { timestamps: true });

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
