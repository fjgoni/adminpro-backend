// RUTA: /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');

const { getHospitales, createHospital, updateHospital,deleteHospital  } = require('../controllers/hospitales.controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();
router.get('/',getHospitales); 
router.post('/', 
            //Middlewares
            [
                validarJWT,
                check('nombre','El nombre del hospital es necesario').not().isEmpty(),
                validarCampos


            ],  createHospital
);

router.put('/:id',
            [
                
            ],
            updateHospital
);

 router.delete('/:id',deleteHospital)


module.exports = router;