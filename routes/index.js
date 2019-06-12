const express = require('express');
const router = express.Router();

const utils = require('../utilities/utilidades');
const Usuario = require('../models/modelo.usuario');

/**
 * Pagina principal del sitio, redirige a la pagina principal de los productos.
 */
router.get('/',  function(req, res) {
    res.redirect('productos');
});

/**
 * Ruta para el login de usuarios existentes. Si ya se encuentra logueado vuelve a la pagina
 * principal.
 */
router.get('/acceder', utils.verificarSesionValida, function(req, res) {
    res.render('acceder', utils.parametrosVista(req));
});

/**
 * Ruta para la registracion de usuarios nuevos. Si no existe un usuario administrador exige
 * que se cree uno. Si ya hay al menos un usuario administrador, se crea un usuario comun.
 * Si ya se encuentra logueado, redirige a la pagina principal.
 */
router.get('/registrar', utils.verificarSesionValida, function(req, res) {
    Usuario.find({ esAdministrador: true }, function(err, users) {
        if (users && users.length > 0) {
            res.render('registrar', utils.parametrosVista(req));
        }
        else {
            res.render('registrar', { ...utils.parametrosVista(req), necesitaAdministrador: true});
        }
    });
});

/**
 * Ruta para el logout del usuario logueado.
 */
router.get('/salir', function(req, res) {
    utils.salir(req, res, function(request, result) {
        res.redirect('/');
    });
/*
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie(constantes.getSessionKey());
    }

    res.redirect('/');*/
});

router.get('/test', function(req, res) {
    res.render('testChecklist', utils.parametrosVista(req));
});

module.exports = router;
