const express =require("express")
const productosSchema = require("../models/productos.models")
const router =express.Router()
//Create Productos 
router.post("/productos", (req,res)=>{
res.send("create product")
} )
router.get("/productos", (req,res)=>{
    res.send("create product")
    } )
    

module.exports= router;