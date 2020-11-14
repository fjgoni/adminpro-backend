/* 

RUTA: /api/usuarios

*/
const { Router } = require('express');
const { check } = require('express-validator');

const {getUsuarios, crearUsuario, modificarUsuario, eliminarUsuario} = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();
router.get('/', validarJWT ,getUsuarios); 
router.post('/', 
            //Middlewares
            [
                check('nombre', 'El nombre es oglitorio').not().isEmpty(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                validarCampos,
            ],
             crearUsuario
);

router.put('/:id',
            [
                validarJWT,
                check('nombre', 'El nombre es oglitorio').not().isEmpty(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                validarCampos
            ],
            modificarUsuario
);

router.delete('/:id',validarJWT ,eliminarUsuario)


module.exports = router;