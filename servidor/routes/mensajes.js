const express = require('express');
const router = express.Router();
const { mensajes, publicaciones } = require('../models');

// Freelancer envía mensaje
router.post('/', async (req, res) => {
  const { contenido, freelancerId, publicacionId } = req.body;
  try {
    const mensaje = await mensajes.create({ contenido, freelancerId, publicacionId });
    res.status(201).json(mensaje);
  } catch (err) {
    res.status(500).json({ error: 'Error al enviar mensaje', details: err });
  }
});

// Cliente responde (acepta o rechaza)
router.put('/:id/responder', async (req, res) => {
  const { estado } = req.body; // 'aceptado' o 'rechazado'
  try {
    const mensaje = await mensajes.findByPk(req.params.id);
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });

    mensaje.estado = estado;
    await mensaje.save();

    // Cambiar estado de publicación a "cerrado"
    await publicaciones.update({ estado: 'cerrado' }, { where: { id: mensaje.publicacionId } });

    res.json({ mensaje: 'Mensaje respondido y publicación cerrada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al responder mensaje', details: err });
  }
});
router.get("/publicacion/:publicacionId", async (req, res) => {
  const { publicacionId } = req.params;
  try {
    const mensaje = await mensajes.findOne({ where: { publicacionId } });
    if (!mensaje) return res.status(404).json({ error: "Mensaje no encontrado" });
    res.json(mensaje);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener mensaje", details: err });
  }
});
module.exports = router;

