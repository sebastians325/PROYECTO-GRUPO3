const postulacionRepo = require('../repositories/postulaciones.repository');
const publicacionRepo = require('../repositories/publicaciones.repository');

exports.crear = async ({ usuarioId, publicacionId }) => {
  return await postulacionRepo.create({ usuarioId, publicacionId });
};

exports.aceptar = async (postulacionId) => {
  const postulacion = await postulacionRepo.findById(postulacionId);
  if (!postulacion) throw new Error("Postulación no encontrada");

  await postulacionRepo.accept(postulacion);
  await postulacionRepo.rejectOthers(postulacion.publicacionId, postulacion.id);
  await publicacionRepo.updateEstado(postulacion.publicacionId, 'en_proceso');

  return { mensaje: 'Postulante aceptado exitosamente.' };
};

