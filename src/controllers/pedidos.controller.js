// controllers/pedidoController.js
const Pedido = require('../models/pedidos.model');

// Crear un nuevo pedido
exports.createPedido = async (req, res) => {
    try {
        const { nombre, correo, articulos } = req.body;
        const nuevoPedido = new Pedido({ nombre, correo, articulos });
        const pedidoGuardado = await nuevoPedido.save();
        res.status(201).json(pedidoGuardado);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el pedido', message: error.message });
    }
};

// Obtener todos los pedidos
exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate({
            path: 'articulos',
            select: 'nombre_articulo precioUnitario descripcion' 
        });
        if (pedidos.length > 0) {
            res.status(200).json(pedidos);
        } else {
            res.status(404).json({ message: 'No se encontraron pedidos' });
        }
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
    }
};

// Obtener un pedido por ID
exports.getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id).populate('articulos');
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pedido', message: error.message });
    }
};

// Actualizar un pedido
exports.updatePedido = async (req, res) => {
    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(pedidoActualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el pedido', message: error.message });
    }
};

// Eliminar un pedido
exports.deletePedido = async (req, res) => {
    try {
        const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
        if (!pedidoEliminado) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json({ message: 'Pedido eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pedido', message: error.message });
    }
};
