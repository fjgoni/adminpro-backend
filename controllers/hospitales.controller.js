const { response } = require('express');
const { body } = require('express-validator');

const Hospital = require('../models/hospital.model');

const getHospitales = async (req,res = response) => {

    const hospitales = await Hospital.find({}).populate('usuario','nombre');

    return res.json({
        ok: true,
        hospitales
    });

}

const createHospital = async( req,res = response) => {

    const id = req.id;
    console.log(id);
    console.log(req.body.nombre)
    const hospital = new Hospital({
        usuario: id,
        nombre : req.body.nombre
    });
    

    try {

      const hospitalDB =   await hospital.save();

      res.json({
          ok: true,
          hospitalDB
      })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }

   

}

const updateHospital = async (req,res) => {

    return res.json({
        ok: true,
        msg: 'PUT Hospitaloso'
    });

}

const deleteHospital = async (req,res) => {
    return res.json({
        ok: true,
        msg: 'DELETE Hospitaloso'
    })
}

module.exports ={
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}