var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/quienesSomos', mainController.quienesSomos);
router.get('/comoComprar', mainController.comoComprar);

module.exports = router;
