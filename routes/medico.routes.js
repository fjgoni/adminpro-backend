// RUTA: /api/medicos

const { Router } = require('express');
const { check } = require('express-validator');
// const { check } = require('express-validator');

const { getMedicos,updateMedico,deleteMedico,createMedico } = require('../controllers/medicos.controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();
router.get('/',getMedicos); 
router.post('/', 
            //Middlewares
            [
                validarJWT,
                check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
                check('hospital', 'El ID del hospital es necesario').isMongoId(),
                validarCampos
            ],  createMedico
);

router.put('/:id',
            [],
            updateMedico
);

 router.delete('/:id',deleteMedico)


module.exports = router;