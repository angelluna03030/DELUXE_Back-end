const { Router } = require('express');
const { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoriaPorId, traerTodasLasCategorias } = require('../controllers/categoria.controlador');
const enrutador = Router();
// GET
enrutador.get('/categorias', traerTodasLasCategorias);
enrutador.get('/categorias/:id', obtenerCategoriaPorId);
// POST
enrutador.post('/categoria', crearCategoria);
// PUT
enrutador.put('/categorias/:id', actualizarCategoria);
// DELETE
enrutador.delete('/categorias/:id', eliminarCategoria);

module.exports = enrutador;
