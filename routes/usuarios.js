const express = require('express');
const router = express.Router();
const cu = require('../controllers/controlador.usuario');
const utils = require('../utilities/utilidades');

/**
 * 
 */
router.get('/admin', utils.verificarAdministrador, cu.administrarUsuario);
router.post('/crear', utils.verificarAdministrador, cu.crearUsuario);
router.get('/buscar', utils.verificarAdministrador, cu.buscarUsuario);
router.get('/buscar/:id', utils.verificarAdministrador, cu.buscarUsuario);
//router.post('/borrar/:id', utils.verificarAdministrador, cu.borrarUsuario);
router.post('/borrar', utils.verificarAdministrador, cu.borrarUsuario);
router.put('/actualizar', utils.verificarAdministrador, cu.actualizarUsuario);
router.post('/registrar', cu.registrarUsuario);
router.post('/acceder', cu.accederUsuario);
router.post('/purgar', utils.verificarAdministrador, cu.purgarUsuarios);

/**
 * Ruta por defecto para /usuarios, cualquier url desconocida es redireccionada a la raiz.
 */
router.get('*', function(req, res) {
    res.redirect('/');
})

module.exports = router;
