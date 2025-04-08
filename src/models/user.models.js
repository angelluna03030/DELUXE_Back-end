const mongoose = require("mongoose");

const usuarioscomprasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    trim: true, // Elimina espacios en blanco
  },
  direccion: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  fechaDeRegistro: {
    type: Date,
    default: Date.now,
  },
  compras: [
    {
      fechaDeCompra: {
        type: Date,
        default: Date.now,
      },
      productos: [
        {
          nombre: String,
          cantidad: Number,
          precio: Number,
          talla: String,
          color: String,
        },
      ],
      totalCompra: {
        type: Number,
        required: true,
      },
    },
  ],
});

const UsuariosCompras = mongoose.model("UsuariosCompras", usuarioscomprasSchema);

module.exports = UsuariosCompras;
