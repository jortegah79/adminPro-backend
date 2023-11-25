
/**
 * Ruta : /api/medicos
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();

router.get('/', validarJWT, getMedicos);
router.post('/',
    [validarJWT,
        check('nombre', "EL nombre del médico es requerido").not().isEmpty(),
        check('hospital','EL hospital id debe de ver valido').isMongoId(),
        validarCampos],
    crearMedico);
router.put('/:id', validarJWT, actualizarMedico);
router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;