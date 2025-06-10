const publicacionRepo = require('../repositories/publicaciones.repository');
const postulacionRepo = require('../repositories/postulaciones.repository');

exports.crear = async ({ titulo, descripcion, usuarioId, pago }) => {
  return await publicacionRepo.create({ titulo, descripcion, usuarioId, pago });
};

exports.listar = async ({ usuarioId }) => {
  const filtros = usuarioId ? { usuarioId: parseInt(usuarioId) } : {};
  return await publicacionRepo.findAllWithCliente(filtros);
};

exports.obtenerCandidatos = async (publicacionId) => {
  return await postulacionRepo.findCandidatos(publicacionId);
};

exports.actualizarEstado = async (publicacionId, nuevoEstado) => {
  const permitidos = ['abierto', 'en_proceso', 'cerrado'];
  if (!permitidos.includes(nuevoEstado)) {
    throw { status: 400, message: "Estado no válido proporcionado." };
  }

  const actualizada = await publicacionRepo.updateEstado(publicacionId, nuevoEstado);
  if (!actualizada) throw { status: 404, message: "Publicación no encontrada." };

  return { mensaje: "Estado actualizado correctamente.", publicacion: actualizada };
};

exports.responderMensaje = async (postulacionId, mensaje) => {
  const actualizado = await postulacionRepo.updateMensaje(postulacionId, mensaje);
  if (!actualizado) throw { status: 404, message: "Postulación no encontrada." };
  return { mensaje: "Mensaje enviado correctamente." };
};

exports.obtenerPorId = async (id) => {
  const publicacion = await publicacionRepo.findByPk(id);
  if (!publicacion) {
    throw { status: 404, message: 'Publicación no encontrada' };
  }
  return publicacion;
};

