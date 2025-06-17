
const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancer.controller');

router.get('/:id', freelancerController.getHistorial); // GET /historial/:id

module.exports = router;
