

const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT }  = require('../helpers/jwt');

//modelo
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');


const getMatchedQuery = async (req, res = response)=>{

    const searchquery = req.query.search;
    //Hace que la busqueda no sea tediosa y permita buscar sin importar si es mayuscula, minuscula,etc
    const regex = new RegExp(searchquery, 'i');

   

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({nombre: regex }),
        Hospital.find({nombre: regex}),
        Medico.find({nombre: regex}),
    ]);
    

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos

    })
}

const getCollection = async (req, res = response)=>{
    const tabla = req.params.tabla
    const searchquery = req.query.search;
    //Hace que la busqueda no sea tediosa y permita buscar sin importar si es mayuscula, minuscula,etc
    const regex = new RegExp(searchquery, 'i');

    let data = [];

   switch (tabla) {
    
    case 'medicos':
        
        data = await Medico.find({nombre: regex}).populate('usuario', 'nombre img')
                                                 .populate('hospital', 'nombre img');        
          
    break;

    case 'hospitales':
           
        data = await Hospital.find({nombre: regex});    
    break;

    case 'usuarios':
       
        data =  await Usuario.find({nombre: regex });

    break;

    default:
       
    return res.status(400).json({
        ok: false,
        msg: 'No existe tal tabla.'
    });

    
  

   }

   res.status(200).json({
    ok: true,
    result: data
    });

}







/*{"_id":{"$oid":"5f99fd4966e18501debac838"},"role":"USER_ROLE","google":false,"nombre":"Francisco","password":"123456","email":"francisco2@gmail.com.ar","__v":0}*/ 
module.exports = {
    getMatchedQuery
   ,getCollection
}