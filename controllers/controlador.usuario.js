const constantes = require('../models/constantes')
const Usuario = require('../models/modelo.usuario');
const utils = require('../utilities/utilidades');
const mongoose = require('mongoose');

/**
 * Funcion auxiliar para crear usuario, llamada por crearUsuario y registrarUsuario.
 * 
 * @param {req} req El request enviado desde el cliente
 * @param {function(req, usuario)} callback la funcion a llamar en caso de crear al usuario,
 * exitosamente, recibe el request original y el usuario que se creo como parametros
 */
function crearUsuarioConCallback(req, callback) {
    Usuario.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        email: req.body.email,
        telefono: req.body.telefono,
        clave: req.body.clave,
        esAdministrador: req.body.esAdministrador
    })
    .then(user => {
        callback(req, user);
    })
}

/**
 * Visualiza la pagina de administracion de usuarios.
 */
exports.administrarUsuario = function(req, res) {
    if (req.session.user && req.session.user.esAdministrador) {
        res.render('administradorUsuarios', utils.parametrosVista(req) );
    }
    else {
        res.redirect("/");
    }
};

/**
 * Crea un usuario, recargando la pagina al finalizar. El administrador crea usuarios.
 */
exports.crearUsuario = function(req, res) {
    crearUsuarioConCallback(req, function(r, u) {
        res.redirect("back");
    });
};

/**
 * Registra un usuario, redireccionando a la pagina de registracion si el mail ya estaba
 * registrado, o al home para proceder al listado de productos si se pudo registrar
 * correctamente.
 */
exports.registrarUsuario = function(req, res) {
    Usuario.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            return err;
        }
        else {
            if (user) {
                res.render("resultado", { url: "/registrar", mensaje: "El e-mail ya se encuentra registrado, intente con otro." });
            }
            else {
                crearUsuarioConCallback(req, function(r, u) {
                    r.session.user = u;
                    res.render("resultado", { url: "/", mensaje: "Registraci&oacute;n exitosa, bienvenido!" });
                });
            }
        }
    });
};

/**
 * Busca un usuario por id. Si no se indica que busque un id, busca todos los usuarios.
 */
exports.buscarUsuario = function(req, res) {
    if (req.params.id) {
        try {
            var id = mongoose.Types.ObjectId(req.params.id);
            Usuario.findById(id, function(err, user) {
                if (err) {
                    return err;
                }

                res.json(user);
            });
        }
        catch (e) {
            res.json();
            //res.redirect('back');
        }
    }
    else {
        Usuario.find({}, function (err, users) {
            if (err) {
                return err;
            }

            res.json(users);
        });
    }
};

/**
 * Actualiza un usuario con nuevos datos. Aun no se llama desde ningun lado.
 */
exports.actualizarUsuario = function(req, res, next) {
    Usuario.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, user) {
        if (err) {
            return next(err);
        }
        res.send("Usuario actualizado.");
    });
};

/**
 * Borra el usuario pedido. Si se le pasa un id incorrecto vuelve a cargar la pagina.
 * 
 * Si uso XmlHttpRequest en el cliente para esperar la respuesta tengo que usar req.params,
 * en caso contrario uso req.body. Por el momento no puedo forzar al usuario actual a
 * desloguearse si se borra a si mismo, por eso desactive la parte AJAX del borrado en el
 * cliente.
 */
exports.borrarUsuario = function(req, res, next) {
    if (req.body.id) {
        try {
            var id = mongoose.Types.ObjectId(req.body.id);
            Usuario.findByIdAndRemove(id, function(err) {
                if (err) {
                    return next(err);
                }
                else {
                    if (req.session.user._id == req.body.id) {
                        utils.salir(req, res, function(request, result) {
                            res.render("resultado", { url: "/", mensaje: "Como su usuario ha sido borrado, ha sido forzado a salir."})
                        });
                    }
                    else {
                        res.render("resultado", { url: "javascript:window.history.back()", mensaje: "Usuario borrado exitosamente."});
                    }
                }
            });
        }
        catch (e) {
            res.redirect("back");
        }
    }
    else {
        res.redirect("back");
    }
};

/**
 * Purga todos los usuarios que no sean administrador de la base de datos.
 */
exports.purgarUsuarios = function(req, res, next) {
    Usuario.deleteMany({esAdministrador: false}, function(err) {
        if (err) {
            res.render("resultado", { url: "javascript:window.history.back()", mensaje: "Error intentando purgar los usuarios comunes: " + err});
        }
        else {
            res.render("resultado", { url: "javascript:window.history.back()", mensaje: "Usuarios comunes purgados exitosamente." });
        }
    })
}

/**
 * Funcion de login. Busca en la base de datos si existe un usuario con ese e-mail y esa
 * clave, si existe se logueo correctamente y redirecciona a la pagina principal, si fallo
 * se vuelve a la pagina de login.
 */
exports.accederUsuario = function(req, res, next) {
    Usuario.findOne({email: req.body.email, clave: req.body.clave}, function(err, user) {
        if (err) {
            return next(err);
        }

        if (user) {
            req.session.user = user;
            res.render("resultado", { url: "/", mensaje: "Acceso permitido, bienvenido!" });
        }
        else {
            res.render("resultado", { url: "/acceder", mensaje: "Acceso denegado, int&eacute;ntelo nuevamente."});
        }
    });
}