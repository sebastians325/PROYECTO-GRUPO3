const express = require('express');
const router = express.Router();
const controller = require('../controllers/postulaciones.controller');

router.post('/', controller.crearPostulacion);
router.put('/:id/aceptar', controller.aceptarPostulante);

module.exports = router;
