const express = require('express');
const router = express.Router();
const {createArticulo, getAllArticulos, getArticuloById, updateArticulo, deleteArticulo} = require('../controllers/articulo.controller');

router.post('/articulos', createArticulo);
router.get('/articulos', getAllArticulos);
router.get('/articulos/:id', getArticuloById);
router.put('/articulos/:id', updateArticulo);
router.delete('/articulos/:id', deleteArticulo);

module.exports = router;
