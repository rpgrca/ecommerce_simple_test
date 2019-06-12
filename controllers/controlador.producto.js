const Producto = require('../models/modelo.producto');
const constantes = require('../models/constantes');
const utils = require('../utilities/utilidades');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

/**
 * Visualiza la pagina principal con los productos obtenidos de la base de datos.
 */
exports.listarProductos = function(req, res) {
    Producto.find({}, function(err, prods) {
        res.render('index', { productos: prods, ...utils.parametrosVista(req) });
    });
};

/**
 * Visualiza la pagina principal filtrada por categoria.
 */
exports.listarPorCategoria = function(req, res) {
    Producto.find({categorias: req.params.categoria}, function(err, prods) {
        res.render('index', { productos: prods, ...utils.parametrosVista(req) });
    });
};

/**
 * Realiza una busqueda de un producto por codigo, si lo encuentra lo visualiza, en caso
 * contrario redirige a la pagina principal.
 */
exports.buscarProductoPorCodigo = function(req, res) {
    Producto.findOne({ codigo: req.params['codigo'] }, function(err, prod) {
        if (prod) {
            res.render('producto', { producto: prod, ...utils.parametrosVista(req) });
        }
        else {
            res.redirect("/");
        }
    });
}

/**
 * Visualiza la pagina de administracion de productos. Solo accesible para un usuario
 * logueado como administrador, si no es redireccionado a la pagina principal.
 */
exports.administrarProductos = function(req, res) {
    if (req.session.user && req.session.user.esAdministrador) {
        res.render('administradorProductos', utils.parametrosVista(req));
    }
    else {
        res.redirect("/");
    }
};

/**
 * Crea un producto. La informacion viene en el body de un POST. Las imagenes usadas deben
 * haber sido elegidas del directorio public/images, si no se encuentra ahi se agrega una
 * por defecto. Si el codigo ya existe el producto no se crea.
 */
exports.crearProducto = function(req, res) {
    Producto.findOne({ codigo: req.body.codigo }, function(err, prod) {
        if (! prod) {
            let categorias = req.body.categorias.split(",").map(item => item.trim()).filter(function(item) { return item != ""});
            var producto = new Producto(
            {
                nombre: req.body.nombre,
                marca: req.body.marca,
                imagen: '/images/no-image.jpg',
                descripcion: req.body.descripcion,
                precioLista: req.body.precioLista,
                precioFinal: req.body.precioFinal,
                codigo: req.body.codigo,
                categorias: categorias
            });

            if (req.body.imagen) {
                let imagen = path.join(__dirname, '..', 'public', 'images', req.body.imagen);

                fs.access(imagen, function(err, stats) {
                    if (! err) {
                        producto.imagen = '/images/' + req.body.imagen;
                    }

                    producto.save(function(err) {
                        if (err) {
                            return err;
                        }
                
                        return res.redirect('admin');
                    })
                });
            }
            else {
                producto.save(function(err) {
                    if (err) {
                        return err;
                    }

                    return res.redirect('admin');
                });
            }
        }
        else {
            res.render("resultado", { url: "javascript:window.history.back()", mensaje: "El c&oacute;digo ya existe, por favor seleccione uno distinto."});
        }
    });
};

/**
 * Busca productos. Si se ingreso un id se busca ese producto determinado, si no hay ninguno
 * se trae la lista completa. Tiene una opcion 'raw' que indica si se quiere traer el JSON o
 * ir a la pagina del producto en el caso de que un unico producto haya sido encontrado por
 * id.
 */
exports.buscarProducto = function(req, res) {
    if (req.query.id) {
        try {
            var id = mongoose.Types.ObjectId(req.query.id);
            Producto.findById(id, function(err, prod) {
                if (err) {
                    return err;
                }
                else {
                    if (prod) {
                        if (req.query.raw) {
                            res.json(prod);
                        }
                        else {
                            res.render('producto', { producto: prod, ...utils.parametrosVista(req) } );
                        }
                    }
                    else {
                        res.render("resultado", { url: "javascript:window.history.back()", mensaje: "El producto con id " + id + " no fue encontrado."})
                    }
                }
            });
        }
        catch (e) {
            res.redirect("back");
        }
    }
    else {
        if (req.query.raw) {
            Producto.find({}, function(err, prods) {
                if (err) {
                    return err;
                }

                res.json(prods);
            });
        }
        else {
            res.redirect('back');
        }
    }
};

/**
 * Realiza la actualizacion del producto con los valores ingresados en el formulario. Aun
 * no ha sido implementada la parte grafica por lo que esta llamada esta huerfana.
 * TODO: Usar la vista resultado.ejs en lugar de enviar texto.
 */
exports.actualizarProducto = function(req, res, next) {
    Producto.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, prod) {
        if (err) {
            return next(err);
        }

        res.send("Producto actualizado.");
    });
};

/**
 * Borra el producto con el id ingresado en el formulario. En este caso se redirige a una
 * pagina en blanco con el resultado de la operacion. Si no se ingreso ningun id se vuelve
 * a refrescar la pagina.
 */
exports.borrarProducto = function(req, res) {
    if (req.body.id) {
        try {
            var id = mongoose.Types.ObjectId(req.body.id);
            Producto.findByIdAndRemove(id, function(err) {
                if (err) {
                    return err;
                }

                res.render("resultado", { url: "javascript:window.history.back()", mensaje: "El producto fue borrado exitosamente."})
            });
        }
        catch (e) {
            res.redirect('back');
        }
    }
    else {
        res.redirect('back');
    }
};

/**
 * Purga todos los productos de la base de datos.
 */
exports.purgarProductos = function(req, res) {
    //if (req.session.user) {
        //if (req.session.user.esAdministrador) {
            Producto.deleteMany({}, function(err) {
                if (err) {
                    res.render("resultado", { url: "javascript:window.history.back()", mensaje: "Error intentando purgar los productos: " + err});
                }
                else {
                    res.render("resultado", { url: "javascript:window.history.back()", mensaje: "Productos purgados exitosamente." });
                }
            });
        //}
        //else {
        //    res.render("resultado", { url: "/", mensaje: "Acceso denegado."});
        //}
    //}
    //else {
    //    res.render("resultado", { url: "/", mensaje: "Acceso denegado."});
    //}
}

/**
 * Funcion recursiva para crear los productos. Intente hacer un ciclo que cree el producto
 * y lo grabe sin esperar a que se termine de grabar, y simplemente no funciono, asi que
 * ahora grabo sincronicamente.
 * 
 * @param {Array} productos Los productos a crear
 */
function grabarProductos(productos) {
    let producto = productos.pop();

    if (producto) {
        Producto.findOne({codigo: producto.codigo}, function(err, prod) {
            if (! prod) {
                let productoNuevo = new Producto(
                {
                    nombre: producto.nombre,
                    marca: producto.marca,
                    imagen: producto.imagen,
                    descripcion: producto.descripcion,
                    precioLista: producto.precioLista,
                    precioFinal: producto.precioFinal,
                    codigo: producto.codigo,
                    categorias: producto.categorias
                });

                productoNuevo.save(function(err) {
                    grabarProductos(productos);
                });
            }
        });
    }
}

/**
 * Inicializa la base de datos con productos por defecto. Si ya existe el mismo codigo de un
 * producto en la base no se vuelve a crear dicho producto. Luego de mostrar confirmacion
 * retorna a la pagina de administracion.
 */
exports.inicializarProductos = function(req, res) {
    let productos = constantes.getProductos();

    grabarProductos(productos);

    res.render("resultado", { url: "javascript:window.history.back()", mensaje: "Base de datos inicializada con &eacute;xito." });
}