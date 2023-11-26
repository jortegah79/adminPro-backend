const { response } = require('express');
const Hospital = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre');

    res.status(200).json({
        ok: true,
        hospitales

    })
}
const crearHospital = async (req, res) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospitalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs"
        })
    }
}
const actualizarHospital = async (req, res) => {

    const id = req.params.id;

    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'hospital no encontrado por id.'
            })
        }
        hospital.nombre = req.body.nombre;

        const cambiosHospital = {
            ...req.body,
            uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });
        res.json({
            ok: true,
            msg: 'Actualiza hospital',
            hospital: hospitalActualizado

        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const borrarHospital = async (req, res = response) => {

     const id = req.params.id;

    try {

        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado con ese id"
            })
        }

        await Hospital.findByIdAndDelete( id )

    res.status(200).json({
        ok: true,
        msg: 'Hospital eliminado'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}