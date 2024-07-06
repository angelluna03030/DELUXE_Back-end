const mongoose = require('mongoose');

const productosSchema = new mongoose.Schema({
    Código: {
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
    descripción: {
        type: String,
        required: true,
        match: /^[A-Za-z0-9\s]+$/
    },
    materiales: {
        type: String,
        required: true,
        match: /^[A-Za-z0-9\s]+$/
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
    categorías: {
        type: String,
        required: true,
        match: /^[A-Za-z]+$/
    },
    fechaCreación: {
        type: Date,
        default: Date.now
    }
});

const Producto = mongoose.model('Producto', productosSchema);

module.exports = Producto;
