const { Router } = require("express");
const {
crearUsuariosCompras,
ObtenerUsuariosCompras,
ObtenerUsuarioPorId
} = require("../controllers/user.controlador");

const middlewareusuariosCompras = require("../middlewares/user.midlleware");
const enrutador = Router();
// GET
enrutador.get("/usuarios", ObtenerUsuariosCompras);
enrutador.get("/usuarios/:id", ObtenerUsuarioPorId);
// POST
enrutador.post("/usuarios", middlewareusuariosCompras, crearUsuariosCompras);

module.exports = enrutador;
