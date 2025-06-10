const { postulaciones, publicaciones } = require('../models');

const validarFreelancerAceptado = async (req, res, next) => {
  const { publicacionId } = req.params;
  const usuarioId = req.user.id; // ID del freelancer autenticado
  const role = req.user.role;

  if (role !== 'freelancer') {
    return res.status(403).json({ error: 'Solo freelancers pueden acceder.' });
  }

  const postulacion = await postulaciones.findOne({
    where: {
      usuarioId,
      publicacionId,
      estado: 'aceptado'
    }
  });

  if (!postulacion) {
    return res.status(403).json({ error: 'No tienes acceso a esta publicación.' });
  }

  next();
};

module.exports = validarFreelancerAceptado;
