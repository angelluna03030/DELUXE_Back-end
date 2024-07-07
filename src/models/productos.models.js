const mongoose = require('mongoose');

const productosSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        match: /^[A-Z0-9]+$/
    },
    nombreproductos: {
        type: String,
        required: true,
        match: /^[A-Za-z]+$/
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    
    },
    materiales: {
        type: String,
        required: true,
     
    },
    tallas: {
        type: [String],
        required: true
    },
    colores: {
        type: [String],
        required: true
    },
    imágenes: {
        type: [String],
        required: true
    },
    categorias: {
        type: String,
        required: true,
        match: /^[A-Za-z]+$/
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Producto = mongoose.model('Producto', productosSchema);

module.exports = Producto;
