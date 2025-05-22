const express = require('express');
const router = express.Router();
const controller = require('../controllers/publicaciones.controller');

router.post("/", controller.crear);
router.get("/", controller.listar);
router.get("/:id/candidatos", controller.verCandidatos);
router.put("/:id", controller.actualizarEstado);
router.put("/:id/cerrar", controller.cerrar);
router.put("/:id/mensaje", controller.enviarMensaje);

module.exports = router;
