var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');


router.get('/cantidadusuarios',apiController.cantidadUsuarios);
router.get('/cantidadProductos', apiController.cantidadProductos);
router.get('/cantidadTalles', apiController.cantidadTalles);
router.get('/cantidadCompras', apiController.cantidadCarritos);
module.exports = router;