const FreelancerRepository = require('../repositories/freelancer.repository');
const HistorialFactory = require('../decorators/HistorialFactory');

class FreelancerService {
  async obtenerHistorial(freelancerId) {
    const trabajos = await FreelancerRepository.obtenerTrabajosConReview(freelancerId);
    return trabajos.map(HistorialFactory.crearEntrada);
  }
}

module.exports = new FreelancerService();
