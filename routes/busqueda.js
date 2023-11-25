/*
ruta:api/todo/:busqueda
-*/
const Router=require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo,getDocumentosColeccion } = require('../controllers/busqueda');

const router=Router();

router.get('/coleccion/:tabla/:busqueda',validarJWT,getDocumentosColeccion);
router.get('/:busqueda',validarJWT,getTodo);


module.exports=router;