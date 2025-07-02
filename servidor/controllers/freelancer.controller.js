const FreelancerService = require('../services/freelancer.service');

class FreelancerController {
  async getHistorial(req, res) {
    try {
      const historial = await FreelancerService.obtenerHistorial(req.params.freelancerId);
      return res.json(historial);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new FreelancerController();
