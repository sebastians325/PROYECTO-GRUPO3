// servidor/routes/postulaciones.routes.js
const router = require('express').Router();
const PostulacionesController = require('../controllers/postulaciones.controller');
const { validatePostulacion } = require('../middleware/validators/postulacion.validator');
const { uploadCV, getCVSignedUrl } = require('../services/s3Service');

// Ruta tradicional con validación
router.post('/', 
    validatePostulacion,
    PostulacionesController.crearPostulacion.bind(PostulacionesController)
);

// Ruta para aceptar postulante
router.put('/:id/aceptar',
    PostulacionesController.aceptarPostulante.bind(PostulacionesController)
);

// Ruta para postular con CV subido a S3
router.post(
    '/postular-con-cv',
    uploadCV.single('cv'),
    PostulacionesController.postularConCV.bind(PostulacionesController)
);

// Ruta para obtener link firmado
router.get('/ver-cv/:filename', async (req, res) => {
  try {
    const url = await getCVSignedUrl(req.params.filename);
    res.json({ url });
  } catch (err) {
    console.error("Error generando URL firmada:", err);
    res.status(500).json({ error: "No se pudo generar el enlace al CV" });
  }
});

module.exports = router;
