
 const estaVacio = (valor) => {
    return !valor || valor.trim().length === 0;
};


 const noCaracteresEspeciales = (valor) => {
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(valor);
};

 const middlewareCategorias = (req, res, next) => {
    const { nombre, imagen, descripcion } = req.body;

    // Validación del nombre
    const nombreValido = /^[A-Za-z]{5,15}$/;
    if (!nombreValido.test(nombre)) {
        return res.status(400).json({ mensaje: 'El nombre debe contener entre 5 y 15 letras sin números y no debe tener espacios al final.' });
    }

    // Validación de la descripción
    if (descripcion.length < 15 || descripcion.length > 100) {
        return res.status(400).json({ mensaje: 'La descripción debe tener entre 15 y 100 caracteres.' });
    }

    // Validación de la imagen
    if (!imagen || imagen.length === 0) {
        return res.status(400).json({ mensaje: 'Se debe seleccionar una imagen.' });
    }

    // Validaciones adicionales
    if (estaVacio(nombre) || estaVacio(descripcion)) {
        return res.status(400).json({ mensaje: 'No se aceptan datos vacíos' });
    }
    
    if (!noCaracteresEspeciales(nombre) || !noCaracteresEspeciales(descripcion)) {
        return res.status(400).json({ mensaje: 'Tipos de datos no válidos' });
    }

    next();
}



module.exports = middlewareCategorias;
