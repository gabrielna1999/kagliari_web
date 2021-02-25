var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const usersMiddleware = require('../middlewares/usersMiddleware');

router.get("/register", usersMiddleware.esInvitado, usersController.register);
router.post("/register", usersMiddleware.validacionRegister, usersMiddleware.estaRegistrado, usersController.processRegister)
router.get("/login", usersMiddleware.esInvitado, usersController.login);
router.post("/login", usersMiddleware.validacionLogin, usersController.processLogin);
router.get("/cerrarSesion", usersController.cerrarSesion);
router.get("/perfil", usersMiddleware.esUsuario, usersController.verPerfil);
router.post("/perfil", usersController.irAEditarPerfil);
router.get("/editarPerfil/:id", usersMiddleware.esUsuario, usersController.editarPerfil);
router.post("/editarPerfil/:id", usersMiddleware.validacionRegister, usersController.guardarCambios);

module.exports = router;
