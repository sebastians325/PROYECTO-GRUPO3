
const { publicaciones, postulaciones, Review, usuarios } = require('../models');

const obtenerHistorialFreelancer = async (freelancerId) => {
  return await publicaciones.findAll({
    where: { estado: 'cerrado' },
    include: [
      {
        model: postulaciones,
        where: { usuarioId :freelancerId, estado: 'aceptado' },
        required: true
      },
      {
        model: Review,
        required: false
      },
      {
        model: usuarios, // cliente
        as: 'cliente',
        attributes: ['nombre', 'apellido']
      }
    ],
    order: [['updatedAt', 'DESC']]
  });
};

module.exports = { obtenerHistorialFreelancer };
