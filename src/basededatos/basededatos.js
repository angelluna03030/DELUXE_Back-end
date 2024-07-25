require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connect mongodb Atlas"))
  .catch((e) => console.error(`Error: ${e}`));