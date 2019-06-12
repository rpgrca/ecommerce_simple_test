const express = require('express');
const router = express.Router();
const cp = require('../controllers/controlador.producto');
const Producto = require('../models/modelo.producto');
const utils = require('../utilities/utilidades');

/**
 * Pagina principal de los productos. Esta es la pagina principal del sitio.
 */
router.get('/', cp.listarProductos);

/**
 * Ruta para la pagina de administracion de productos. Si no se encuentra logueado y si no
 * es un usuario administrador, redirige a la pagina principal.
 */
router.get('/admin', utils.verificarAdministrador, cp.administrarProductos);

/**
 * Ruta para la busqueda de productos
 */
router.get('/buscar', cp.buscarProducto);

/**
 * Ruta para la actualizacion de productos. Aun no se utiliza aunque la funcionalidad ya
 * esta codificada. Solo acepta pedidos desde un usuario administrador.
 */
router.put('/actualizar', utils.verificarAdministrador, cp.actualizarProducto);

/**
 * Ruta para la creacion de productos. Solo acepta pedidos desde un usuario administrador.
 */
router.post('/crear', utils.verificarAdministrador, cp.crearProducto);

/**
 * Ruta para la inicializacion de la base de datos.
 */
router.post('/inicializar', utils.verificarAdministrador, cp.inicializarProductos);

/**
 * Ruta para el borrado de productos de la base de datos.
 */
router.post('/borrar', utils.verificarAdministrador, cp.borrarProducto);

/**
 * Ruta para el purgado de productos de la base de datos.
 */
router.post('/purgar', utils.verificarAdministrador, cp.purgarProductos);

//router.post('/borrar/:id', cp.borrarProducto);
//router.get('/buscar/:id/:raw', cp.buscarProducto);

/**
 * Ruta para mostrar un modelo especifico de producto.
 */
router.get('/item/:codigo', cp.buscarProductoPorCodigo);

/**
 * Ruta para listar productos filtrados por categoria.
 */
router.get('/categoria/:categoria', cp.listarPorCategoria);

/**
 * Ruta por defecto para /productos, cualquier url desconocida es redireccionada a la raiz.
 */
router.get('*', function(req, res) {
    res.redirect('/');
});

module.exports = router;
