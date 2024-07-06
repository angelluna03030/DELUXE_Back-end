const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();
const productoRoutes = require("./routes/productos.routes");
const app = express();
const puerto = process.env.PORT || 9000;

//middelware
app.use("/api", productoRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connect mongodb Atlas"))
  .catch((e) => console.error(`Error: ${e}`));

app.listen(puerto, () => {
  console.log(`servidor corriendo por el puerto ${puerto}`);
});

app.get("/", (req, res) => {
  res.send("Wolcon API");
});
