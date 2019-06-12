const Producto = require('../models/modelo.producto');
const constantes = require('../models/constantes');

exports.parametrosVista = function(req) {
    var usuario;

    if (req.session.user) {
        usuario = { nombre: req.session.user.nombre, esAdministrador: req.session.user.esAdministrador };
    }

    return { title: constantes.getTitulo(), usuario: usuario, necesitaAdministrador: false };
}

/**
 * Esta funcion verifica si el usuario se encuentra logueado y es un administrador, si es
 * asi permite la siguiente accion, en caso contrario redirige a la pagina principal.
 */
exports.verificarAdministrador = function(req, res, next) {
    if (req.session.user && req.session.user.esAdministrador) {
        next();
    }
    else {
        res.redirect('/');
    }
}

/**
 * Esta funcion verifica si el usuario se encuentra logueado, si eas asi redirige
 * a la pagina principal. Usado en las paginas de acceso y registracion.
 */
exports.verificarSesionValida = function(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    }
    else {
        next();
    }
}

/**
 * Si se encuentra logueado se sale de la aplicacion, redireccionando a la pagina principal
 */
exports.salir = function(req, res, callback) {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie(constantes.getSessionKey());
    }

    if (callback) {
        callback(req, res);
    }
}