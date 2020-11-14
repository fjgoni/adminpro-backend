const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT }  = require('../helpers/jwt');

//modelo
const Usuario = require('../models/usuario.model');


const getUsuarios = async (req, res)=>{

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        user_req_id: req.id
    })
}

const crearUsuario = async (req, res = response)=>{

    const {email, password, nombre } = req.body;

    try {
        const emailExiste = await Usuario.findOne({email : email});

    if(emailExiste){
        return res.status(400).json({
            ok: false,
            msg: 'Email ya existe.'
        })
    }
    const usuario = new Usuario(req.body);

    //Enctriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    // Guardar usuario en BD
    await usuario.save();
    
    let token = await generarJWT(usuario.id, usuario.nombre)

    
    res.json({
        ok: true,
        usuario,
        token
    });
    
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Hubo un error, revisá los logs!'
        });
    }
}


const modificarUsuario = async(req, res = response) => {

        let id = req.params.id;

        try {
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return res.status(404).json({
                    ok: false,
                    msg: 'ID not found'
                });
            }

            const {password, google, email, ...campos} = req.body;
            
            if(usuario.email !== email){
        
                const existeEmail = await Usuario.findOne({email: email});
                if(existeEmail){
                    return res.status(400).json({
                        ok: false,
                        msg: 'Email ya existe.'
                    });
                }
            }
            campos.email = email;
            
            const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, { new : true});

            res.json({
                ok: true,
                usuario: usuarioActualizado
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                ok: false,
                msg: 'Revisar logs'
            });
        }
}


const eliminarUsuario = async (req,res = response) => {
     
    const id = req.params.id;

    try {

        const usuario = await Usuario.findById(id);
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'ID not found'
            });
        }

        await Usuario.findByIdAndDelete(id);

        res.status(200).json({
        ok: true,
        msg: 'Usuario borrado con exito'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hubo un error, contactar con el administrador'
        })
    }

    

}




/*{"_id":{"$oid":"5f99fd4966e18501debac838"},"role":"USER_ROLE","google":false,"nombre":"Francisco","password":"123456","email":"francisco2@gmail.com.ar","__v":0}*/ 
module.exports = {
    getUsuarios,
    crearUsuario,
    modificarUsuario,
    eliminarUsuario
}