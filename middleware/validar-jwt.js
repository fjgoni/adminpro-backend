const {response, request} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request,res = response ,next) =>{

    const token = req.header('x-token')
    console.log(token);

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token was provided in headers'
        });
    }

    try {

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();

    } catch (error) {
        return res.status(401).json({

            ok: false,
            msg: 'Invalid token'

        });
    }


   
}


module.exports = {
    validarJWT
}