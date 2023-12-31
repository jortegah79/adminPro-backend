const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, cantidad] =await Promise.all(
        [Usuario.find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()]);

    res.status(200).json({
        ok: true,
        cantidad,
        usuarios
    })
}
const crearUsuario = async (req, res) => {

    const { email, password, nombre } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "EL correo ya está registrado"
            });
        }
        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);

        const user = await usuario.save();



        const token = await generarJWT(user._id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs"
        })
    }
}
const actualizarUsuario = async (req, res) => {

    const uuid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uuid);

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            })
        }
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEMail = await Usuario.findOne({ email })
            if (existeEMail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        //Actualizaciones

        // delete campos.password;
        // delete campos.google;
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uuid, campos, { new: true });

        res.json({
            ok: true,
            usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}
const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            })
        }

        await Usuario.findByIdAndDelete(uid)

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}