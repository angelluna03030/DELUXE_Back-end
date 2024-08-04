const { Router } = require('express');
const { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoriaPorId, traerTodasLasCategorias } = require('../controllers/controlador.controlador');
const enrutador = Router();

// GET
enrutador.get('/categorias', traerTodasLasCategorias);
enrutador.get('/categoria/:id', obtenerCategoriaPorId);

// POST
enrutador.post('/categoria', crearCategoria);

// PUT
enrutador.put('/categoria/:id', actualizarCategoria);

// DELETE
enrutador.delete('/categoria/:id', eliminarCategoria);

module.exports = enrutador;
