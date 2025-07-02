const { mensajes } = require('../models');

class MessageService {
  async createMessage(data) {
    return mensajes.create(data);
  }
}

module.exports = MessageService;
