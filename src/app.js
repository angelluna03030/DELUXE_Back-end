const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");

// Middleware para parsear el body de las solicitudes
app.use(express.json());
app.use(cors());

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public"); // TODO: Cambiar a una ruta más específica si es necesario
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage });

// Ruta para la carga de archivos
app.post("/public", upload.single('file'), (req, res) => {
    res.status(200).send({ data: "Imagen cargada correctamente", file: req.file });
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((e) => console.error(`Error al conectar a MongoDB: ${e}`));

// Rutas
const productoRoutes = require("./routes/productos.routes");
const categoriaRoutes = require("./routes/categorias.routes");

app.use("/api", productoRoutes);
app.use("/api", categoriaRoutes);

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API!");
});

// Iniciar el servidor en el puerto especificado en las variables de entorno
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
