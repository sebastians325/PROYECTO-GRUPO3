// routes/clientProfile.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { ClientProfile, User } = require('../models');

// Crear perfil de cliente (solo para role cliente)
router.post('/', auth, async (req, res) => {
  try {
    const { empresa, descripcion, ubicacion } = req.body;

    if (req.user.role !== 'cliente') {
      return res.status(403).json({ error: 'Solo clientes pueden crear su perfil' });
    }

    const existente = await ClientProfile.findOne({ where: { userId: req.user.id } });
    if (existente) {
      return res.status(400).json({ error: 'Perfil ya existe para este usuario' });
    }

    const perfil = await ClientProfile.create({ empresa, descripcion, ubicacion, userId: req.user.id });
    res.status(201).json(perfil);
  } catch (err) {
    res.status(500).json({ error: 'Error creando perfil', details: err.message });
  }
});

// Obtener perfil de cliente propio
router.get('/me', auth, async (req, res) => {
  try {
    const perfil = await ClientProfile.findOne({
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
