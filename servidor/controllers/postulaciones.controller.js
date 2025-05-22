const PostulacionFacade = require('../facades/PostulacionFacade');
const PostulacionDTO = require('../dtos/postulacion.dto.js');
const { BaseController } = require('./base.controller');

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
}

module.exports = new PostulacionesController();
