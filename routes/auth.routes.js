// path /api/login

const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const router = Router();

router.get('/',(req,res)=>{
    res.json({
        ok: true
    });
})

router.post('/',
[
    
    check('email', 'debe ser de tipo email').isEmail(),
    check('password').not().isEmpty(),
    validarCampos
],
login
)


module.exports =  router;
