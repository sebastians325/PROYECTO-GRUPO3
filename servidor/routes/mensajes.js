const express = require('express');
const router = express.Router();
const { usuarios, publicaciones, postulaciones, mensajes } = require('../models');
 
const MessageService = require('../services/MessageService');
const EmailSender = require('../services/EmailSender');
const EmailNotificationMessageService = require('../decorators/EmailNotificationMessageService');
 
const baseService = new MessageService();
const emailSender = new EmailSender();
const decoratedService = new EmailNotificationMessageService(baseService, emailSender, usuarios);

router.get('/publicacion/:publicacionId', async (req, res) => {
  const { publicacionId } = req.params;
  const { usuarioId } = req.query; // id del usuario que solicita

  try {
    // Validar que usuario está relacionado con la publicación (cliente o freelancer aceptado)
    const publicacion = await publicaciones.findByPk(publicacionId);
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }

    const usuario = await usuarios.findByPk(usuarioId);
    if (!usuario) return res.status(403).json({ error: 'Usuario no válido.' });

    if (usuario.role === 'cliente' && publicacion.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No tienes acceso a estos mensajes.' });
    }

    if (usuario.role === 'freelancer') {
      const postulacionAceptada = await postulaciones.findOne({
        where: {
          publicacionId,
          usuarioId,
          estado: 'aceptado'
        }
      });
      if (!postulacionAceptada) {
        return res.status(403).json({ error: 'No tienes acceso a estos mensajes.' });
      }
    }

    const mensajesHistorial = await mensajes.findAll({
      where: { publicacionId },
      include: [
        {
          model: usuarios,
          as: 'remitente',
          attributes: ['id', 'nombre', 'apellido', 'role']
        },
        {
          model: usuarios,
          as: 'destinatario',
          attributes: ['id', 'nombre', 'apellido', 'role']
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    res.json(mensajesHistorial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener mensajes.', details: err.message });
  }
});


// Cliente ve sus publicaciones con botones nuevoMensaje y verMensajes
router.get('/cliente/:clienteId/publicaciones', async (req, res) => {
  const { clienteId } = req.params;

  try {
    const cliente = await usuarios.findByPk(clienteId);
    if (!cliente || cliente.role !== 'cliente') {
      return res.status(403).json({ error: 'Solo clientes pueden acceder a esta vista.' });
    }

    // Buscar publicaciones del cliente
    const publicacionesCliente = await publicaciones.findAll({
      where: { usuarioId: clienteId },
      order: [['createdAt', 'DESC']]
    });

    res.json(publicacionesCliente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener publicaciones del cliente.', details: err.message });
  }
});

// Freelancer ve sus postulaciones aceptadas con botón verMensajes
router.get('/freelancer/:freelancerId/postulaciones', async (req, res) => {
  const { freelancerId } = req.params;

  try {
    const freelancer = await usuarios.findByPk(freelancerId);
    if (!freelancer || freelancer.role !== 'freelancer') {
      return res.status(403).json({ error: 'Solo freelancers pueden acceder a esta vista.' });
    }

    // Buscar postulaciones aceptadas del freelancer junto con la info de la publicación
    const postulacionesAceptadas = await postulaciones.findAll({
      where: {
        usuarioId: freelancerId,
        estado: 'aceptado'
      },
      include: [
        {
          model: publicaciones,
          as: 'publicacion', // Cambio necesario aquí
          attributes: ['id', 'titulo', 'descripcion', 'estado']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(postulacionesAceptadas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener postulaciones aceptadas.', details: err.message });
  }
});
// Obtener freelancer aceptado para una publicación
router.get('/publicacion/:publicacionId/freelancer', async (req, res) => {
  const { publicacionId } = req.params;
  try {
    const postulacionAceptada = await postulaciones.findOne({
      where: { publicacionId, estado: 'aceptado' },
      include: [{ model: usuarios, attributes: ['id', 'nombre', 'apellido', 'role'] }],
    });
    if (!postulacionAceptada) {
      return res.status(404).json({ error: 'No hay freelancer aceptado para esta publicación.' });
    }
    res.json(postulacionAceptada.usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener freelancer aceptado.', details: err.message });
  }
});

// Comunicación directa entre usuarios 
router.post('/directo', async (req, res) => {
  const { contenido, remitenteId, destinatarioId, publicacionId } = req.body;
 
  try {
    const remitente = await usuarios.findByPk(remitenteId);
    const destinatario = await usuarios.findByPk(destinatarioId);
 
    if (!remitente || !destinatario) {
      return res.status(400).json({ error: 'Remitente o destinatario no válido.' });
    }
 
    if (remitenteId === destinatarioId) {
      return res.status(400).json({ error: 'No puedes enviarte mensajes a ti mismo.' });
    }
 
    const mensaje = await decoratedService.createMessage({
      contenido,
      remitenteId,
      destinatarioId,
      publicacionId,
      estado: 'pendiente',
    });
 
    res.status(201).json({ mensaje: 'Mensaje enviado y email notificado.', data: mensaje });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al enviar mensaje.', details: err.message });
  }
});

module.exports = router; 
