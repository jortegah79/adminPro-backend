const { response } = require('express');
const Medico = require('../models/medico');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res = response) => {

     const medicos = await Medico.find({})
     .populate('hospital','nombre img')
     .populate('usuario',"nombre img");

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

    // const uuid = req.params.id;

    // try {
    //     const usuarioDB = await Usuario.findById(uuid);

    //     if (!usuarioDB) {
    //         res.status(404).json({
    //             ok: false,
    //             msg: "No existe un usuario con ese id"
    //         })
    //     }
    //     const { password, google, email, ...campos } = req.body;

    //     if (usuarioDB.email !== email) {

    //         const existeEMail = await Usuario.findOne({ email })
    //         if (existeEMail) {
    //             return res.status(400).json({
    //                 ok: false,
    //                 msg: 'Ya existe un usuario con ese email'
    //             })
    //         }
    //     }

    //     //Actualizaciones

    //     // delete campos.password;
    //     // delete campos.google;
    //     campos.email = email;
    //     const usuarioActualizado = await Usuario.findByIdAndUpdate(uuid, campos, { new: true });

    res.json({
        ok: true,
        //usuarioActualizado
        msg: 'Actualiza medico'

    })
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Error inesperado'
    //     })
    // }

}
const borrarMedico = async (req, res = response) => {

    // const uid = req.params.id;

    // try {

    //     const usuarioDB = await Usuario.findById(uid);

    //     if (!usuarioDB) {
    //         res.status(404).json({
    //             ok: false,
    //             msg: "No existe un usuario con ese id"
    //         })
    //     }

    //     await Usuario.findByIdAndDelete(uid)

    res.status(200).json({
        ok: true,
        msg: 'medico eliminado'
    })
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Error inesperado'
    //     })
    // }
}
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}