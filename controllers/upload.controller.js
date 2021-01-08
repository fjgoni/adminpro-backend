const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generarJWT }  = require('../helpers/jwt');

const uploadFile = async (res,res = response) =>{
    


    res.json({
        ok: true,
        msg: 'fileUpload'
    });

}




module.exports = {
  uploadFile
}