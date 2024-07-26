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
        cb(null, "./public"); // Cambiar a una ruta más específica si es necesario
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`);
    }
});

const upload = multer({ storage });

// Ruta para la carga de múltiples archivos
/// tengo que subir el archivo con este nombre 
// !                                |
//                                  |
 
app.post("/public", upload.array('files', 10), (req, res) => { // 'files' es el nombre del campo que espera recibir y 10 es el máximo de archivos permitidos
    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ error: "No se han subido archivos" });
    }
    const fileNames = req.files.map(file => file.filename);
    res.status(200).send({
        data: "Imágenes cargadas correctamente",
        files: fileNames
    });
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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



module.exports = app;
