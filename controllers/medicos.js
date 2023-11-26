const { response } = require('express');
const Medico = require('../models/medico');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find({})
        .populate('hospital', 'nombre img')
        .populate('usuario', "nombre img");

    res.status(200).json({
        ok: true,
        medicos

    })
}
const crearMedico = async (req, res) => {

    const medico = new Medico({ usuario: req.uid, ...req.body });

    try {


        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs"
        })
    }
}
const actualizarMedico = async (req, res) => {

    const id = req.params.id;

    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: "No existe un medico con ese id"
            })
        }
        medico.nombre = req.body.nombre;

        const cambioMedico = {
            ...req.body,
            uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico, { new: true });

        res.json({
            ok: true,
            msg: 'Actualiza medico',
            medicoActualizado

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}
const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    
    try {

        const medico = await Medico.findById( id );

        if ( !medico ) {
             res.status(404).json({
                ok: false,
                msg: "Medico no encontrado con ese id"
            })
        }

        await Medico.findByIdAndDelete( id )

    res.status(200).json({
        ok: true,
        msg: 'medico eliminado'
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunique con el administrador'
        })
    }
}
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}