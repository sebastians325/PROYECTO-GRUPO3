class EmailNotificationMessageService {
  constructor(baseService, emailSender, usuarioModel) {
    this.baseService = baseService;
    this.emailSender = emailSender;
    this.usuarioModel = usuarioModel;
  }

async createMessage(data) {
  const message = await this.baseService.createMessage(data);

  try {
    const destinatario = await this.usuarioModel.findByPk(data.destinatarioId);
    if (destinatario?.correo) {
      await this.emailSender.send(destinatario.correo, `Tienes un nuevo mensaje: "${data.contenido}"`);
    } else {
      console.warn(`Destinatario sin correo válido: ${data.destinatarioId}`);
    }
  } catch (error) {
    console.error('Error al enviar correo:', error.message);
    // No interrumpimos la creación del mensaje si el correo falla
  }

  return message;
}

}

module.exports = EmailNotificationMessageService;

