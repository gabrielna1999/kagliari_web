var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

// Para guardar los archivos de imagen al crear producto uso el paquete multer
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/producto')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const usersMiddleware = require('../middlewares/usersMiddleware');
const detalleMiddleware = require('../middlewares/detalleMiddleware');

router.get('/detalleProducto/:id', productController.vistaDetalleProducto );
router.post('/detalleProducto/:id', detalleMiddleware.SelecTalle , usersMiddleware.esUsuario, cartController.agregarProducto );
router.get('/carrito', usersMiddleware.esUsuario, cartController.vistaCarrito);
router.get('/carrito/sumar/:id/:cantidad', usersMiddleware.esUsuario, cartController.sumar);
router.get('/carrito/restar/:id/:cantidad', usersMiddleware.esUsuario, cartController.restar);
router.get('/cargarProducto', usersMiddleware.esAdmin, productController.cargarProducto);
router.post('/cargarProducto', upload.any(), productController.guardarProducto);
router.get("/vistaProductos", productController.vistaProductos);
router.get("/edicionProductos/:id", usersMiddleware.esAdmin, productController.editarProductos); 
router.post("/edicionProductos/:id", upload.any(), productController.actualizar);
router.get("/borrar/:id", productController.borrar);
router.get('/sacarDelCarrito/:id', cartController.eliminarProducto );
router.get('/finalizarCompra', usersMiddleware.esUsuario, cartController.finalizarCompra );
// Buscador
router.get('/search', productController.search);

module.exports = router;