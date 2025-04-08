
const verificarCompras = (req, res, next) => {
    console.log("verificarCompras")
    const { compras } = req.body;
    if (!compras || !Array.isArray(compras) || compras.length === 0) {
    return res.status(400).json({ error: "Debe agregar al menos un producto a el carrito" });
    }
    next();
    };
module.exports = verificarCompras;
    
    