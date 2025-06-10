const { publicaciones, usuarios } = require('../models');

exports.create = async (data) => {
  return await publicaciones.create(data);
};

exports.findAllWithCliente = async (filtros) => {
  return await publicaciones.findAll({
    where: filtros,
    include: [{
      model: usuarios,
      as: 'cliente',
      attributes: ['id', 'nombre', 'apellido']
    }],
    order: [['createdAt', 'DESC']]
  });
};

exports.findById = async (id) => {
  return await publicaciones.findByPk(id);
};

exports.updateEstado = async (id, nuevoEstado) => {
  const publicacion = await publicaciones.findByPk(id);
  if (!publicacion) return null;
  publicacion.estado = nuevoEstado;
  await publicacion.save();
  return publicacion;
};
