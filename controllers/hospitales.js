const { response } = require('express');
const Hospital = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
    .populate('usuario','nombre');

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
        //     const existeEmail = await Usuario.findOne({ email });

        //     if (existeEmail) {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: "EL correo ya está registrado"
        //         });
        //     }
        //     const usuario = new Usuario(req.body);

        //     //encriptar contraseña
        //     const salt = bcrypt.genSaltSync();

        //     usuario.password = bcrypt.hashSync(password, salt);

        const hospitalDB = await hospital.save();



        //     const token = await generarJWT(user._id)

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
        msg: 'Actualiza hospital'

    })
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Error inesperado'
    //     })
    // }

}
const borrarHospital = async (req, res = response) => {

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
        msg: 'Hospital eliminado'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}