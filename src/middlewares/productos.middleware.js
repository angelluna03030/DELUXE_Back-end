const estaVacio = (valor) => {
    return !valor || (typeof valor === 'string' && valor.trim().length === 0);
};
const noCaracteresEspeciales = (valor) => {
    const regex = /^[A-Za-z0-9\s]+$/;
    return regex.test(valor);
};

const middlewareProductos = (req, res, next) => {
    const { nombreproductos, precio, descripcion, tallas, colores, imagenes, categorias } = req.body;

    // Validación del nombre
    const nombreValido = /^[A-Za-z]{5,15}$/;
    if (!nombreValido.test(nombreproductos)) {
        return res.status(400).json({ mensaje: 'El nombre debe contener entre 5 y 15 letras sin números y no debe tener espacios al final.' });
    }

    // Validación de la descripción
    if (descripcion.length < 15 || descripcion.length > 100) {
        return res.status(400).json({ mensaje: 'La descripción debe tener entre 15 y 100 caracteres.' });
    }

    // Validación del precio
    if (isNaN(precio) || precio > 1000000) {
        return res.status(400).json({ mensaje: 'El precio debe ser numérico y no superar el millón.' });
    }

    // Al menos una categoría, un color o una imagen
    if (estaVacio(colores) && estaVacio(categorias) && estaVacio(imagenes) && estaVacio(tallas)) {
        return res.status(400).json({ mensaje: 'Debe seleccionar al menos un color, una categoría o una imagen.' });
    }

    // Validaciones adicionales
    if (estaVacio(nombreproductos) || estaVacio(descripcion)) {
        return res.status(400).json({ mensaje: 'No se aceptan datos vacíos' });
    }
    
    if (!noCaracteresEspeciales(nombreproductos) || !noCaracteresEspeciales(descripcion)) {
        return res.status(400).json({ mensaje: 'Tipos de datos no válidos por aqui ' });
    }

    next();
};

module.exports = middlewareProductos;
