const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/
    },
    imagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
        match: /^[A-Za-z0-9\s]+$/
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;