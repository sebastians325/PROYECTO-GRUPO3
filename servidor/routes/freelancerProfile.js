const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { FreelancerProfile, User } = require('../models');

// Crear perfil técnico (solo freelancers)
router.post('/', auth, async (req, res) => {
    try {
      const { profesion, experiencia, habilidades, isPublic } = req.body;
  
      if (req.user.role !== 'freelancer') {
        return res.status(403).json({ error: 'Solo freelancers pueden crear su perfil técnico' });
      }
  
      const existePerfil = await FreelancerProfile.findOne({ where: { userId: req.user.id } });
      if (existePerfil) {
        return res.status(400).json({ error: 'Perfil ya existe para este usuario' });
      }
  
      const perfil = await FreelancerProfile.create({
        profesion,
        experiencia,
        habilidades,
        isPublic,
        userId: req.user.id
      });
  
      res.status(201).json(perfil);
    } catch (err) {
      res.status(500).json({ error: 'Error creando perfil', details: err.message });
    }
  });
  
  // Obtener perfil propio
  router.get('/me', auth, async (req, res) => {
    try {
      const perfil = await FreelancerProfile.findOne({
        where: { userId: req.user.id },
        include: [{ model: User, attributes: ['nombre', 'apellido', 'correo'] }]
      });
      if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });
      res.json(perfil);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener perfil', details: err.message });
    }
  });
  
  module.exports = router;  