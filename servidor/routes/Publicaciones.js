//routes/Publicaciones.js
const express = require('express');
const router = express.Router();
const { publicaciones, usuarios, postulaciones, mensajes } = require('../models');

// Crear publicación
router.post("/", async (req, res) => {
    const { titulo, descripcion, usuarioId, pago } = req.body;
    try {
        const nuevaPublicacion = await publicaciones.create({
            titulo,
            descripcion,
            usuarioId,
            pago 
        });
        res.status(201).json(nuevaPublicacion);
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        res.status(500).json({ error: "Error al crear la publicación", details: error.message });
    }
});

// Obtener publicaciones
router.get("/", async (req, res) => {
    const { usuarioId } = req.query;
    try {
        const whereClause = usuarioId ? { usuarioId: parseInt(usuarioId) } : {};

        const listaPublicaciones = await publicaciones.findAll({
            where: whereClause,
            include: [
                {
                    model: usuarios,
                    as: "cliente",
                    attributes: ['id', 'nombre', 'apellido']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(listaPublicaciones);
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        res.status(500).json({ error: "Error al obtener publicaciones", details: error.message });
    }
});

// Obtener candidatos para una publicación
router.get("/:id/candidatos", async (req, res) => {
    const publicacionId = req.params.id;
    try {
        const listaCandidatos = await postulaciones.findAll({
            where: { publicacionId: parseInt(publicacionId) },
            include: [{
                model: usuarios,
                as: "freelancer",
                attributes: ['id', 'nombre', 'apellido', 'especialidad']
            }]
        });
        res.json(listaCandidatos);
    } catch (error) {
        console.error("Error al obtener candidatos:", error);
        res.status(500).json({ error: "Error al obtener candidatos", details: error.message });
    }
});

// Actualizar estado
router.put("/:id", async (req, res) => {
    const publicacionId = req.params.id;
    const { estado: nuevoEstado } = req.body;

    const estadosPermitidos = ['abierto', 'en_proceso', 'cerrado'];
    if (!nuevoEstado || !estadosPermitidos.includes(nuevoEstado)) {
        return res.status(400).json({ error: "Estado no válido proporcionado." });
    }

    try {
        const publicacion = await publicaciones.findByPk(parseInt(publicacionId));
        if (!publicacion) return res.status(404).json({ error: "Publicación no encontrada." });

        publicacion.estado = nuevoEstado;
        await publicacion.save();

        res.json({ mensaje: "Estado de la publicación actualizado correctamente.", publicacion });

    } catch (error) {
        console.error("Error al actualizar el estado de la publicación:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar el estado", details: error.message });
    }
});

// Cerrar publicación directamente
router.put("/:id/cerrar", async (req, res) => {
    try {
        const publicacionId = req.params.id;
        const publicacion = await publicaciones.findByPk(parseInt(publicacionId));
        if (!publicacion) return res.status(404).json({ error: "Publicación no encontrada." });

        publicacion.estado = 'cerrado';
        await publicacion.save();
        res.json({ mensaje: "Publicación cerrada correctamente." });
    } catch (error) {
        console.error("Error al cerrar publicación:", error);
        res.status(500).json({ error: "Error al cerrar publicación", details: error.message });
    }
});

// Enviar mensaje en respuesta a postulación
router.put("/:id/mensaje", async (req, res) => {
    const postulacionId = req.params.id;
    const { mensaje } = req.body;
    try {
        const postulacion = await postulaciones.findByPk(parseInt(postulacionId));
        if (!postulacion) return res.status(404).json({ error: "Postulación no encontrada" });

        postulacion.mensajeRespuesta = mensaje;
        await postulacion.save();

        res.json({ mensaje: "Mensaje enviado correctamente." });
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        res.status(500).json({ error: "Error al enviar mensaje", details: error.message });
    }
});

// Obtener publicaciones con mensajes iniciados por cliente
router.get('/cliente/:clienteId/publicaciones', async (req, res) => {
  try {
    const publicacionesConMensajes = await publicaciones.findAll({
      where: { usuarioId: req.params.clienteId },
      include: [
        {
          model: mensajes,
          required: true
        }
      ]
    });

    res.json(publicacionesConMensajes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener publicaciones con mensajes', details: err.message });
  }
});

// NUEVA RUTA: Obtener cliente (usuario creador) de una publicación
router.get('/:publicacionId/cliente', async (req, res) => {
  try {
    const publicacion = await publicaciones.findByPk(req.params.publicacionId, {
      include: {
        model: usuarios,
        as: 'cliente',
        attributes: ['id', 'nombre', 'apellido', 'correo']
      }
    });

    if (!publicacion) return res.status(404).json({ error: 'Publicación no encontrada' });

    res.json(publicacion.cliente);
  } catch (error) {
    console.error('Error al obtener cliente de la publicación:', error);
    res.status(500).json({ error: 'Error al obtener cliente de la publicación', details: error.message });
  }
});

module.exports = router;
