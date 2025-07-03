const express = require('express');
const router = express.Router();
const FreelancerController = require('../controllers/freelancer.controller');

// Ruta para ver historial de trabajos realizados
router.get('/:freelancerId/historial', FreelancerController.getHistorial);

module.exports = router;
