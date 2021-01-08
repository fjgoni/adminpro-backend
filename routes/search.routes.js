// RUTA: /api/search (?search=test)




const { Router } = require('express');
const { check } = require('express-validator');
// const { check } = require('express-validator');

const { getMatchedQuery, getCollection } = require('../controllers/search.controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();
router.get('/',validarJWT,getMatchedQuery); 
router.get('/:tabla', validarJWT, getCollection)


module.exports = router;