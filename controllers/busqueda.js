//getTodo
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async function (req, res) {

    const busqueda = req.params.busqueda || "";
    const regexp = RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regexp }),
        Medico.find({ nombre: regexp }),
        Hospital.find({ nombre: regexp })
    ]);

    res.status(200).json({
        "ok": true,
        "msg": busqueda,
        "usuarios": usuarios,
        "hospitales": hospitales,
        "medicos": medicos
    })
}

const getDocumentosColeccion = async function (req, res) {

    const tabla = req.params.tabla || "";
    const busqueda = req.params.busqueda || "";
    const regexp = RegExp(busqueda, 'i');

  
    let data = [];
    switch (tabla) {
        case "medicos":
             data = await Medico.find({ nombre: regexp })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case "hospitales":
            data = await Hospital.find({ nombre: regexp })
                .populate('usuario', 'nombre img');
            break;
        case "usuarios":
             data = await Usuario.find({ nombre: regexp });
            break;
        default:
            return res.status(400).json({ ok: false, msg: "la tabla tiene que ser de usuarios/hospitales/medicos" })

        }
    res.status(200).json({
        ok: true,
        resultados: data       
    })
}







module.exports = {
    getTodo,
    getDocumentosColeccion
}