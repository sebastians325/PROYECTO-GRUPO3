const router = require('express').Router();
const PostulacionesController = require('../controllers/postulaciones.controller');
const { validatePostulacion } = require('../middleware/validators/postulacion.validator');

router.post('/', 
    validatePostulacion,
    PostulacionesController.crearPostulacion.bind(PostulacionesController)
);

router.put('/:id/aceptar',
    PostulacionesController.aceptarPostulante.bind(PostulacionesController)
);

module.exports = router;
