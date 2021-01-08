
const express = require('express');
const { conn } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//Crear server express
const app = express();

//Configurar CORS
app.use(cors());
//Body parse
app.use(express.json());
//Base de datos
conn();


//rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/hospitales', require('./routes/hospital.routes'));
app.use('/api/medicos', require('./routes/medico.routes'));
app.use('/api/search', require('./routes/search.routes'));
app.use('/api/upload', require('./routes/upload.routes'));


app.listen(process.env.PORT, ()=>{
    console.log("Server listening! "+ process.env.PORT);
})