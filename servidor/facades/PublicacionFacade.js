const service = require('../services/publicaciones.service');

class PublicacionFacade {
  async crearPublicacion(data) {
    return await service.crear(data);
  }

  async listarPublicaciones(filtros) {
    return await service.listar(filtros);
  }

  async obtenerCandidatos(publicacionId) {
    return await service.obtenerCandidatos(publicacionId);
  }

  async actualizarEstado(publicacionId, nuevoEstado) {
    return await service.actualizarEstado(publicacionId, nuevoEstado);
  }

  async cerrarPublicacion(publicacionId) {
    return await service.actualizarEstado(publicacionId, 'cerrado');
  }

  async responderPostulacion(postulacionId, mensaje) {
    return await service.responderMensaje(postulacionId, mensaje);
  }

  async puedePostular(publicacionId) {
    const publicacion = await service.obtenerPorId(publicacionId);
    return publicacion.estado === 'abierto';
  }
}

module.exports = new PublicacionFacade();

