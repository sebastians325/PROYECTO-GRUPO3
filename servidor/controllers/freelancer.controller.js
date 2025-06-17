
const freelancerService = require('../services/freelancer.service');

exports.getHistorial = async (req, res) => {
  try {
    const data = await freelancerService.getHistorialFreelancer(req.params.id);
    res.json(data);
  } catch (error) {
    console.error('Error real:', error); // ✅ Agrega esto para ver el error completo
    res.status(500).json({ error: 'Error al obtener el historial del freelancer' });
  }
};
