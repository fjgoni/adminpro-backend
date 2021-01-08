const { response } = require('express');

const Medico = require('../models/medico.model');

const getMedicos = async (req,res = response) => {

    const medicos = await Medico.find({}).populate('usuario','nombre img')
                                         .populate('hospital','nombre img');

    return res.json({
        ok: true,
        medicos
    });

}

const createMedico = async( req,res) => {

   
    const id = req.id;

    const medico = new Medico({
        usuario: id,
        ...req.body
    })

    try {

        const medicodb = await medico.save();
        res.json({
            ok: true,
            medico: medicodb
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   

}

const updateMedico = async (req,res) => {

    return res.json({
        ok: true,
        msg: 'PUT Medicoso'
    });

}

const deleteMedico = async (req,res) => {
    return res.json({
        ok: true,
        msg: 'DELETE Medico'
    })
}

module.exports ={
    getMedicos,
    updateMedico,
    deleteMedico,
    createMedico
}