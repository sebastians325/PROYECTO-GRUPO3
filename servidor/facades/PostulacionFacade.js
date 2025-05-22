const service = require('../services/postulaciones.service');

class PostulacionFacade {
  async crear(data) {
    return await service.crear(data);
  }

  async aceptar(postulacionId) {
    return await service.aceptar(postulacionId);
  }
}

module.exports = new PostulacionFacade();

