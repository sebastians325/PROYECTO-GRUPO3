
const freelancerRepo = require('../repositories/freelancer.repository');

const getHistorialFreelancer = async (freelancerId) => {
  return await freelancerRepo.obtenerHistorialFreelancer(freelancerId);
};

module.exports = { getHistorialFreelancer };
