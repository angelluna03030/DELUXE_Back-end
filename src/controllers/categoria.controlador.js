
const Categoria = require('../models/categoria.modelo');
// trae los categorias 
const traerTodasLasCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ error: e.message });
    }
};
// trae la categoria por el id 
 const obtenerCategoriaPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ error: e.message });
    }
};


//crea una categoria
 const crearCategoria = async (req, res) => {
    const { nombre, imagen, descripcion } = req.body;
    const nuevaCategoria = new Categoria({
        nombre,
        imagen,
        descripcion
    });

    try {
        const data = await nuevaCategoria.save();
        res.status(201).json(data);
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ error: e.message });
    }
};

//Editar categoria por el id 
 const actualizarCategoria = async (req, res) => {
    const id = req.params.id;
    const { nombre, imagen, descripcion } = req.body;

    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, { nombre, imagen, descripcion }, { new: true });
        if (!categoriaActualizada) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(categoriaActualizada);
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ error: e.message });
    }
};

// eliminar una categoria por el id
 const eliminarCategoria = async (req, res) => {
    const id = req.params.id;

    try {
        const categoriaEliminada = await Categoria.findByIdAndDelete(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ error: e.message });
    }
};




module.exports = {
    traerTodasLasCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};