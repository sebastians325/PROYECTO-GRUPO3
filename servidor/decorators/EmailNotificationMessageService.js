class EmailNotificationMessageService {
  constructor(baseService, emailSender, usuarioModel) {
    this.baseService = baseService;
    this.emailSender = emailSender;
    this.usuarioModel = usuarioModel;
  }
 
  async createMessage(data) {
    const message = await this.baseService.createMessage(data);
 
    const destinatario = await this.usuarioModel.findByPk(data.destinatarioId);
    if (destinatario?.correo) {
      await this.emailSender.send(
        destinatario.correo,
        `Tienes un nuevo mensaje: "${data.contenido}"`
      );
    } else {
      console.log(`No se encontró correo para usuario ${data.destinatarioId}`);
    }
 
    return message;
  }
}
 
module.exports = EmailNotificationMessageService;
