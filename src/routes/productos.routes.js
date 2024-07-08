const express = require('express');
const router = express.Router();
const Producto = require('../models/productos.models'); 
// crea los productos 
router.post("/producto", (req, res) => {
    const { codigo, nombreproductos, precio, descripcion, materiales, tallas, colores, imagenes, categorías } = req.body;
    const producto = new Producto(req.body);
    producto.save()
        .then((data) => res.status(201).json(data))
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});
// trae la producto por el id 

router.get("/productos", (req, res) => {
    Producto.find()
        .then((producto) => res.status(200).json(producto))
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});
// trae la producto por el id 

router.get("/producto/:id", (req, res) => {
    const id = req.params.id;
    Producto.findById(id)
        .then((producto) => {
            if (!producto) {
                return res.status(404).json({ message: 'El Producto no encontrada' });
            }
            res.status(200).json(producto);
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});
// trae la producto por la categoria 

router.get('/productos/categoria/:categorias', (req, res) => {
    const categoria = req.params.categorias;
    Producto.find({ categorias: categoria })
        .then((productos) => {
            if (productos.length === 0) {
                return res.status(404).json({ message: 'No se encontraron productos para esta categoría' });
            }
            res.status(200).json(productos);
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});
//Editar producto por el id 

router.put("/producto/:id", (req, res) => {
    const id = req.params.id;
   
    const { codigo, nombreproductos, precio, descripcion, materiales, tallas, colores, imagenes, categorias } = req.body;
    Producto.findByIdAndUpdate(id, { codigo, nombreproductos, precio,  descripcion, materiales, tallas, colores, imagenes, categorias }, { new: true })
        .then((productoActualizada) => {
            if (!productoActualizada) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }
            res.status(200).json(productoActualizada);
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});
// eliminar una producto por el id
router.delete("/producto/:id", (req, res) => {
    const id = req.params.id;

    Producto.findByIdAndDelete(id)
        .then((productoEliminada) => {
            if (!productoEliminada) {
                return res.status(404).json({ message: 'Producto no encontrada' });
            }
            res.status(200).json({ message: 'Producto eliminada correctamente' });
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});


module.exports= router;