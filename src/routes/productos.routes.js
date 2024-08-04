const { Router } = require('express');
const {obtenerProductos, obtenerProductoPorId, obtenerProductosPorCategoria , buscarProductos, actualizarProducto, crearProducto, eliminarProducto, cambiarEstadoProducto} = require('../controllers/productos.controlador');
const enrutador = Router();
// GET
enrutador.get('/productos', obtenerProductos);
enrutador.get('/productos/:id',obtenerProductoPorId );
enrutador.get('/productos/categorias/:categoria',obtenerProductosPorCategoria );
enrutador.get('/productos/buscar/:query',buscarProductos )
// POST
enrutador.post('/productos', crearProducto);

// PUT
enrutador.put('/productos/:id', actualizarProducto);
enrutador.put('productos/estado/:id', cambiarEstadoProducto);
// DELETE
enrutador.delete('/productos/:id', eliminarProducto);

module.exports = enrutador;
