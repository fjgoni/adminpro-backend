
const express = require('express');
const { conn } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//Crear server express
const app = express();

//Configurar CORS
app.use(cors());

//Base de datos
conn();


//rutas

app.get('/', (req,res)=>{
    res.json({
        ok : true, 
        msg : 'Hola Mundo!'
    })
}) 

app.listen(process.env.PORT, ()=>{
    console.log("Server listening! "+ process.env.PORT);
})