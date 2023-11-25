//getTodo
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const { v4: uuidv4 } = require('uuid');
const path=require('path');
const fs=require('fs');


const actualizarImagen = require('../helpers/actualizar_foto');

const fileUpload = async function (req, res) {

    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {

        res.status(400).json({
            ok: false,
            msg: "El tipo seleccionado no es un médico,usuario u hospital."
        });

    }
    if (!req.files || Object.keys(req.files).length === 0) {

        return res.status(400).json({
            ok: false,
            msg: 'no hay ningún archivo'
        });

    }
    //procesar imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extension)) {

        return res.status(400).json({
            ok: false,
            msg: "No es una extensión válida"
        })

    }
    const nombreArchivo = `${uuidv4()}.${extension}`;
    const path = `uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                msg: "Error al subir la imagen"
            });
        }
    });

    actualizarImagen(tipo,id,nombreArchivo);
    
    res.json({
        ok: true, msg: "Archivo subido",
        nombreArchivo
    });
}

const retornaImagen = async function (req, res) {

     const tipo = req.params.tipo;
     const foto = req.params.foto;
     const pathImg=path.join(__dirname,`../uploads/${ tipo }/${ foto }`);
     if( fs.existsSync( pathImg )){
         res.sendFile( pathImg );
        }else{
            const pathImg2=path.join(__dirname,`../uploads/no-image.png`);
        res.sendFile ( pathImg2 );
    }
    
}
   
module.exports = {
    fileUpload,
    retornaImagen
}