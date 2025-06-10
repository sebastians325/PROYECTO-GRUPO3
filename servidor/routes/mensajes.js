//routes/mensajes.js
const express = require('express');
const router = express.Router();
const { mensajes, publicaciones, usuarios, postulaciones, sequelize } = require('../models');

// Cliente inicia conversación (solo si freelancer fue aceptado y no hay conversación previa)
router.post('/', async (req, res) => {
  const { contenido, publicacionId, remitenteId, destinatarioId } = req.body;

  try {
    const cliente = await usuarios.findByPk(remitenteId);
    if (!cliente || cliente.role !== 'cliente') {
      return res.status(403).json({ error: 'Solo clientes pueden iniciar conversación.' });
    }

    const publicacion = await publicaciones.findByPk(publicacionId);
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }

    if (publicacion.usuarioId !== remitenteId) {
      return res.status(403).json({ error: 'No puedes iniciar mensajes en publicaciones que no son tuyas.' });
    }

    const freelancer = await usuarios.findByPk(destinatarioId);
    if (!freelancer || freelancer.role !== 'freelancer') {
      return res.status(400).json({ error: 'El destinatario debe ser un freelancer.' });
    }

    const postulacionAceptada = await postulaciones.findOne({
      where: {
        publicacionId,
        usuarioId: destinatarioId,
        estado: 'aceptado',
      },
    });

    if (!postulacionAceptada) {
      return res.status(400).json({ error: 'Solo puedes iniciar mensajes con freelancers aceptados en la publicación.' });
    }

    // Verificar si ya existe conversación (sin importar el orden remitente/destinatario)
    const conversacionExistente = await mensajes.findOne({
      where: {
        publicacionId,
        [sequelize.Op.or]: [
          { remitenteId, destinatarioId },
          { remitenteId: destinatarioId, destinatarioId: remitenteId }
        ]
      }
    });

    if (conversacionExistente) {
      return res.status(400).json({ error: 'Ya existe una conversación con este freelancer para esta publicación.' });
    }

    const mensaje = await mensajes.create({
      contenido,
      publicacionId,
      remitenteId,
      destinatarioId,
      estado: 'pendiente',
    });

    res.status(201).json(mensaje);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al enviar mensaje.', details: err.message });
  }
});

// Obtener mensajes (historial) para publicación - orden cronológico
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

// Freelancer o cliente responde en conversación existente
router.post('/responder', async (req, res) => {
  const { contenido, publicacionId, remitenteId, destinatarioId } = req.body;

  try {
    const remitente = await usuarios.findByPk(remitenteId);
    const destinatario = await usuarios.findByPk(destinatarioId);

    if (!remitente || !destinatario) {
      return res.status(400).json({ error: 'Remitente o destinatario no válido.' });
    }

    // Solo roles permitidos en el intercambio
    if (
      !(remitente.role === 'cliente' && destinatario.role === 'freelancer') &&
      !(remitente.role === 'freelancer' && destinatario.role === 'cliente')
    ) {
      return res.status(403).json({ error: 'Roles no permitidos para enviar mensajes.' });
    }

    // Validar que existe conversación previa (cualquiera de los dos pudo iniciar)
    const existeConversacion = await mensajes.findOne({
      where: {
        publicacionId,
        [sequelize.Op.or]: [
          { remitenteId, destinatarioId },
          { remitenteId: destinatarioId, destinatarioId: remitenteId }
        ]
      }
    });

    if (!existeConversacion) {
      return res.status(403).json({ error: 'No puedes responder sin conversación previa.' });
    }

    const nuevoMensaje = await mensajes.create({
      contenido,
      publicacionId,
      remitenteId,
      destinatarioId,
      estado: 'pendiente',
    });

    res.status(201).json({ mensaje: 'Respuesta enviada', data: nuevoMensaje });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al responder mensaje.', details: err.message });
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

// Obtener cliente dueño de la publicación
router.get('/publicacion/:publicacionId/cliente', async (req, res) => {
  const { publicacionId } = req.params;
  try {
    const publicacion = await publicaciones.findByPk(publicacionId, {
      include: [{ model: usuarios, attributes: ['id', 'nombre', 'apellido', 'role'] }],
    });
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }
    res.json(publicacion.usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cliente de la publicación.', details: err.message });
  }
});

module.exports = router;
