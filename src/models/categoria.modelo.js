const mongoose = require('mongoose');

const categoriasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/
    },
    imagen: {
        type: String,
        required: true
    },
    descripción: {
        type: String,
        required: true,
        match: /^[A-Za-z0-9\s]+$/
    },
    fechaCreación: {
        type: Date,
        default: Date.now
    }
});

const Categoria = mongoose.model('Categoria', categoriasSchema);

module.exports = Categoria;
