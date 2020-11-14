const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generarJWT }  = require('../helpers/jwt');

const login = async(req,res=response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        //Verificar mail
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'correo no validos'
            });
        }

        //Verificar contraseña
        const validarPass = bcrypt.compareSync(password, usuarioDB.password);
        if(!validarPass){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        //Se genera el token
        const token = await generarJWT(usuarioDB.id, usuarioDB.nombre);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el administrador'
        });
    }
}

module.exports = {
    login
}