const express = require('express');
const router = express.Router();
const { publicaciones, usuarios, postulaciones } = require('../models');

// Crear publicación (cliente)
router.post("/", async (req, res) => {
    const { titulo, descripcion, usuarioId, pago } = req.body; // <-- Asegúrate de incluir "pago"
    try {
        const nuevaPublicacion = await publicaciones.create({
            titulo,
            descripcion,
            usuarioId,
            pago // <-- Incluye pago aquí
        });
        res.status(201).json(nuevaPublicacion);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la publicación", details: error });
    }
});

// Ver publicaciones (cliente o freelancer)
router.get("/", async (req, res) => {
    const { usuarioId } = req.query;

    try {
        const whereClause = usuarioId ? { usuarioId } : {};

        const listaPublicaciones = await publicaciones.findAll({
            where: whereClause,
            include: [
                {
                    model: usuarios,
                    as: "cliente",
                    attributes: ['id', 'nombre', 'apellido']
                }
            ]
        });

        res.json(listaPublicaciones);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener publicaciones", details: error });
    }
});

// Ver lista de candidatos para una publicación (cliente)
router.get("/:id/candidatos", async (req, res) => {
    const publicacionId = req.params.id;
    try {
        const listaCandidatos = await postulaciones.findAll({
            where: { publicacionId },
            include: [{
                model: usuarios,
                as: "freelancer",
                attributes: ['id', 'nombre', 'apellido', 'especialidad']
            }]
        });
        res.json(listaCandidatos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener candidatos", details: error });
    }
});
// Desde cliente, cerrar publicación al aceptar mensaje
router.put("/:id/cerrar", async (req, res) => {
    try {
        await publicaciones.update({ estado: 'cerrado' }, { where: { id: req.params.id } });
        res.json({ mensaje: "Publicación cerrada" });
    } catch (error) {
        res.status(500).json({ error: "Error al cerrar publicación", details: error });
    }
});
// Freelancer envía mensaje al cliente
router.put("/:id/mensaje", async (req, res) => {
    const { mensaje } = req.body;
    try {
        const postulacion = await postulaciones.findByPk(req.params.id);
        if (!postulacion) return res.status(404).json({ error: "Postulación no encontrada" });

        postulacion.mensajeRespuesta = mensaje;
        await postulacion.save();

        res.json({ mensaje: "Mensaje enviado correctamente." });
    } catch (error) {
        res.status(500).json({ error: "Error al enviar mensaje", details: error });
    }
});


module.exports = router;

