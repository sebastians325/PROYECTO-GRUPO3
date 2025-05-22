const { postulaciones, usuarios } = require('../models');
const { Op } = require('sequelize');

exports.create = async (data) => {
  return await postulaciones.create(data);
};

exports.findById = async (id) => {
  return await postulaciones.findByPk(id);
};

exports.rejectOthers = async (publicacionId, exceptId) => {
  return await postulaciones.update(
    { estado: 'rechazado' },
    {
      where: {
        publicacionId,
        id: { [Op.ne]: exceptId }
      }
    }
  );
};

exports.accept = async (postulacion) => {
  postulacion.estado = 'aceptado';
  return await postulacion.save();
};

exports.findCandidatos = async (publicacionId) => {
  return await postulaciones.findAll({
    where: { publicacionId: parseInt(publicacionId) },
    include: [{
      model: usuarios,
      as: "freelancer",
      attributes: ['id', 'nombre', 'apellido', 'especialidad']
    }]
  });
};



