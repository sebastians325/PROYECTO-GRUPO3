const express = require('express');
const router = express.Router();
const { publicaciones, usuarios, postulaciones } = require('../models');

// Crear publicación (cliente)
router.post("/", async (req, res) => {
    const { titulo, descripcion, usuarioId } = req.body;
    try {
        const nuevaPublicacion = await publicaciones.create({ titulo, descripcion, usuarioId });
        res.status(201).json(nuevaPublicacion);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la publicación", details: error });
    }
});

// Ver todas las publicaciones (freelancer)
router.get("/", async (req, res) => {
    try {
        const publicacionesList = await publicaciones.findAll({
            include: [{ model: usuarios, as: "cliente", attributes: ['id', 'nombre', 'apellido'] }]
        });
        res.json(publicacionesList);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener publicaciones" });
    }
});

// Ver lista de candidatos para una publicación (cliente)
router.get("/:id/candidatos", async (req, res) => {
    const publicacionId = req.params.id;
    try {
        const listaCandidatos = await postulaciones.findAll({
            where: { publicacionId },
            include: [{ model: usuarios, as: "freelancer", attributes: ['id', 'nombre', 'apellido', 'especialidad'] }]
        });
        res.json(listaCandidatos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener candidatos" });
    }
});

module.exports = router;