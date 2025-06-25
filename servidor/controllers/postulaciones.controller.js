const PostulacionFacade = require('../facades/PostulacionFacade');
const PostulacionDTO = require('../dtos/postulacion.dto.js');
const { BaseController } = require('./base.controller');
const { postulaciones } = require('../models'); // Importación directa para la creación con CV
const getCVSignedUrl = require('../services/s3SignedUrl');

class PostulacionesController extends BaseController {
    constructor() {
        super();
        this.facade = PostulacionFacade;
    }

    async crearPostulacion(req, res) {
        try {
            const postulacionData = PostulacionDTO.fromRequest(req.body);
            const nueva = await this.facade.crear(postulacionData);
            return this.created(res, PostulacionDTO.toResponse(nueva));
        } catch (err) {
            return this.handleError(res, err);
        }
    }

    async aceptarPostulante(req, res) {
        try {
            const result = await this.facade.aceptar(req.params.id);
            return this.success(res, PostulacionDTO.toResponse(result));
        } catch (err) {
            return this.handleError(res, err);
        }
    }

    async postularConCV(req, res) {
  try {
    const { usuarioId, publicacionId } = req.body;

    if (!usuarioId || !publicacionId) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const cvUrl = req.file ? req.file.location : null;

    const nueva = await postulaciones.create({
      usuarioId,
      publicacionId,
      cvUrl,
      estado: 'pendiente'
    });

    return this.created(res, PostulacionDTO.toResponse(nueva));
  } catch (err) {
    console.error("Error al postular con CV:", err);
    return this.handleError(res, err);
  }
}
}

module.exports = new PostulacionesController();
