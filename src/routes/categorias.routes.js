const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria.modelo');
// trae los categorias 
router.get("/categorias", (req, res) => {
    Categoria.find()
        .then((categorias) => res.status(200).json(categorias))
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});
// trae la categoria por el id 

router.get("/categoria/:id", (req, res) => {
    const id = req.params.id;
    Categoria.findById(id)
        .then((categoria) => {
            if (!categoria) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }
            res.status(200).json(categoria);
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});

//crea una categoria
router.post("/categoria", (req, res) => {
    const {   nombre, imagen, descripcion} = req.body;
    const nuevaCategoria = new Categoria({
        nombre: nombre,
        imagen: imagen,
        descripcion: descripcion
    });
    
    nuevaCategoria.save()
        .then((data) => res.status(201).json(data))
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});
//Editar categoria por el id 
router.put("/categoria/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, imagen, descripcion } = req.body;

    Categoria.findByIdAndUpdate(id, { nombre, imagen, descripcion }, { new: true })
        .then((categoriaActualizada) => {
            if (!categoriaActualizada) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }
            res.status(200).json(categoriaActualizada);
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});
//cambio de estado 
router.put('/estado/:id', (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;

    // Validar que el estado sea 0 o 1
    if (estado !== 0 && estado !== 1) {
        return res.status(400).json({ message: 'El estado debe ser 0 o 1' });
    }
    Producto.findByIdAndUpdate(id, { estado }, { new: true })
        .then((productoActualizado) => {
            if (!productoActualizado) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json(productoActualizado);
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});

// eliminar una categoria por el id
router.delete("/categoria/:id", (req, res) => {
    const id = req.params.id;

    Categoria.findByIdAndDelete(id)
        .then((categoriaEliminada) => {
            if (!categoriaEliminada) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }
            res.status(200).json({ message: 'Categoría eliminada correctamente' });
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            res.status(500).json({ error: e.message });
        });
});


module.exports = router;
