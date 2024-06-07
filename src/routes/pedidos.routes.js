// routes/pedidoRoutes.js
const express = require('express');
const { createPedido, getAllPedidos, getPedidoById, updatePedido, deletePedido } = require('../controllers/pedidos.controller');
const router = express.Router();

router.post('/pedidos', createPedido);
router.get('/pedidos', getAllPedidos);
router.get('/pedidos/:id', getPedidoById);
router.put('/pedidos/:id', updatePedido);
router.delete('/pedidos/:id', deletePedido);

module.exports = router;
