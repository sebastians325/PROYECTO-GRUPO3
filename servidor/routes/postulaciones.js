const express = require('express');
const router = express.Router();
const { postulaciones, usuarios, publicaciones } = require('../models');

// Aplicar a un trabajo (freelancer)
router.post("/", async (req, res) => {
    const { usuarioId, publicacionId } = req.body;
    try {
        const nuevaPostulacion = await postulaciones.create({ usuarioId, publicacionId });
        res.status(201).json(nuevaPostulacion);
    } catch (error) {
        res.status(500).json({ error: "Error al postular", details: error });
    }
});

// Aceptar a un postulante (cliente)
router.put("/:id/aceptar", async (req, res) => {
    const postulacionId = req.params.id;
    try {
        // 1. Aceptar postulante
        const postulacion = await postulaciones.findByPk(postulacionId);
        if (!postulacion) return res.status(404).json({ error: "Postulación no encontrada" });

        postulacion.estado = 'aceptado';
        await postulacion.save();

        // 2. Rechazar a los demás
        await postulaciones.update(
            { estado: 'rechazado' },
            { where: { publicacionId: postulacion.publicacionId, id: { [require('sequelize').Op.ne]: postulacionId } } }
        );

        // 3. Cambiar estado de la publicación a "en_proceso"
        await publicaciones.update(
            { estado: 'en_proceso' },
            { where: { id: postulacion.publicacionId } }
        );

        res.json({ mensaje: "Postulante aceptado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "Error al aceptar postulante", details: error });
    }
});

module.exports = router;