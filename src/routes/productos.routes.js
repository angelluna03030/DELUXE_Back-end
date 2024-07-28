const express = require('express');
const router = express.Router();
const Producto = require('../models/productos.models'); 
// crea los productos 
 const  generarCodigo =()=> {
    // Función para generar una letra mayúscula aleatoria
    function obtenerLetraMayuscula() {
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const indice = Math.floor(Math.random() * letras.length);
        return letras[indice];
    }

    // Función para generar un número aleatorio del 0 al 9
    function obtenerNumero() {
        return Math.floor(Math.random() * 10);
    }

    // Generar las letras mayúsculas
    let letrasMayusculas = '';
    for (let i = 0; i < 3; i++) {
        letrasMayusculas += obtenerLetraMayuscula();
    }

    // Generar los números
    let numeros = '';
    for (let i = 0; i < 3; i++) {
        numeros += obtenerNumero();
    }

    // Combinar letras y números
    return letrasMayusculas + numeros;
}



router.post("/producto", (req, res) => {
    const { nombreproductos, estado, precio, descripcion, materiales, tallas, colores, imagenes, categorias } = req.body;
    
    // Generar el código para el nuevo producto
    const codigo = generarCodigo();
console.log("Datos que trae ", req.body)
    const producto = new Producto({
        codigo,
        nombreproductos,
        estado,
        precio,
        descripcion,
        materiales,
        tallas,
        colores,
        imagenes,
        categorias
    });

    producto.save()
        .then((data) => res.status(201).json(data))
        .catch((e) => {
            console.error('Error al guardar el producto:', e);
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
    const categorias = req.params.categorias;
    Producto.find({ categorias: { $in: [categorias] } })
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
   
    const { nombreproductos, precio, descripcion, materiales, tallas, colores, imagenes, categorias } = req.body;
    Producto.findByIdAndUpdate(id, {  nombreproductos, precio,  descripcion, materiales, tallas, colores, imagenes, categorias }, { new: true })
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

//cambiando de estado al producto 
//cambio de estado 
//http://localhost:3000/api/producto/estado/6693e3ecb4fad72ee214be5c
router.put('/producto/estado/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        const estadoProducto = producto.estado;

        // Verificar que el estado del producto sea 0 o 1
        if (estadoProducto !== 1 && estadoProducto !== 0) {
            return res.status(400).json({ mensaje: "Este producto no puede ser cambiado de estado" });
        }

        // Cambiar el estado del producto
        producto.estado = estadoProducto === 1 ? 0 : 1;

        // Guardar el producto actualizado en la base de datos
        await producto.save();

        res.status(200).json({ datos: producto });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
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