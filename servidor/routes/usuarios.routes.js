const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios.controller');

router.get("/", controller.obtenerTodos);
router.post("/", controller.crearGenerico);
router.post("/register", controller.registrarFreelancer);
router.post("/register/cliente", controller.registrarCliente);
router.post("/login", controller.login);

module.exports = router;