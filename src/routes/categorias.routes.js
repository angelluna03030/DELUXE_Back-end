const { Router } = require('express');
const { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoriaPorId, traerTodasLasCategorias , cambiarEstadoCategoria} = require('../controllers/categoria.controlador');
const enrutador = Router();
// GET
enrutador.get('/categorias', traerTodasLasCategorias);
enrutador.get('/categorias/:id', obtenerCategoriaPorId);
// POST
enrutador.post('/categorias', crearCategoria);
// PUT
enrutador.put('/categorias/:id', actualizarCategoria);
enrutador.put("/categorias/estado/:id", cambiarEstadoCategoria );
// DELETE
// enrutador.delete('/categorias/:id', eliminarCategoria);

module.exports = enrutador;
