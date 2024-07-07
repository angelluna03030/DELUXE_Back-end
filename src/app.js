const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware para parsear el body de las solicitudes
app.use(express.json()); 


// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((e) => console.error(`Error al conectar a MongoDB: ${e}`));

// Rutas
const productoRoutes = require("./routes/productos.routes");
const categoriaRoutes = require("./routes/caterias.routes");

app.use("/api", productoRoutes);
app.use("/api", categoriaRoutes);

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API!");
});

module.exports = app;

