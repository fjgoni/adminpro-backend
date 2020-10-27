const mongoose = require('mongoose');
require('dotenv').config();
const conn = async()=>{
    try {   
        await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true    
    });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo iniciar la BD');
    }
    

}

module.exports = {
    conn
}
