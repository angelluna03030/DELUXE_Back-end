const UsuariosCompras = require("../models/user.models");
const crearUsuariosCompras = async (req, res) => {
  try {

    const { nombre, correo, direccion, departamento, compras } = req.body;

    if (!nombre || !correo || !direccion || !departamento || !compras || !Array.isArray(compras)) {
      return res.status(400).json({ error: "Todos los campos son obligatorios y 'compras' debe ser un array." });
    }

    // Verificar que cada compra tenga productos
    compras.forEach((compra, index) => {
      if (!compra.productos || !Array.isArray(compra.productos) || compra.productos.length === 0) {
        return res.status(400).json({ error: `La compra ${index + 1} no tiene productos.` });
      }
    });

    // Crear la instancia del usuario con compras
    const nuevoUsuarioCompra = new UsuariosCompras({
      nombre,
      correo,
      direccion,
      departamento,
      compras,
    });

    const usuarioGuardado = await nuevoUsuarioCompra.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario con compras", detalle: error.message });
  }
};

const ObtenerUsuariosCompras = async (req, res) => {
  try {
    const usuariosCompras = await UsuariosCompras.find();
    res.status(200).json(usuariosCompras);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios con compras", detalle: error.message });
  }
};
const ObtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioCompra = await UsuariosCompras.findById(id);

    if (!usuarioCompra) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(usuarioCompra);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario", detalle: error.message });
  }
};


module.exports = {
  crearUsuariosCompras,
  ObtenerUsuariosCompras,
  ObtenerUsuarioPorId
};