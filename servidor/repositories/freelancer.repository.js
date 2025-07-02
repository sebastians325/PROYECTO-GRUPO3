const { postulaciones, publicaciones, Review, usuarios } = require('../models');

class FreelancerRepository {
  async obtenerTrabajosConReview(freelancerId) {
    return await postulaciones.findAll({
      where: { usuarioId: freelancerId, estado: 'aceptado' },
      include: [
        {
          model: publicaciones,
          as: 'publicacion',
          where: { estado: 'cerrado' },
          include: [
            {
              model: Review,
              as: 'review',
              include: [
                {
                  model: usuarios,
                  as: 'cliente',
                  attributes: ['nombre', 'apellido']
                }
              ]
            }
          ]
        }
      ]
    });
  }
}

module.exports = new FreelancerRepository();
