const express = require('express');
const router = express.Router();
const Producto = require('../models/productos.models'); // Asegurate de importar el modelo correctamente

router.post("/productos", (req, res) => {
    const { Codigo, nombreproductos, precio, descripcion, materiales, tallas, colores, imagenes, categorías } = req.body;
    const producto = new Producto(req.body);
    producto.save()
        .then((data) => res.status(201).json(data))
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});
router.get("/productos", (req, res) => {
    Producto.find()
        .then((productos) => res.status(200).json(productos))
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});



module.exports= router;