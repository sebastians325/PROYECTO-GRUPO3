const EmailNotificationMessageService = require('../decorators/EmailNotificationMessageService');
const MessageService = require('../services/MessageService');

// Mock del modelo usuarios
const usuariosMock = {
  findByPk: jest.fn()
};

// Mock del servicio base
const baseServiceMock = {
  createMessage: jest.fn()
};

// Mock del email sender
const emailSenderMock = {
  send: jest.fn()
};

describe('EmailNotificationMessageService', () => {
  let service;

  beforeAll(() => {
    // Silencia console.warn y console.error durante los tests
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restaura comportamiento normal
    console.warn.mockRestore();
    console.error.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    service = new EmailNotificationMessageService(baseServiceMock, emailSenderMock, usuariosMock);
  });

  test('Happy Path: Crea el mensaje y envía el correo', async () => {
    const data = {
      contenido: 'Hola',
      remitenteId: 1,
      destinatarioId: 2,
      publicacionId: 5,
      estado: 'pendiente'
    };

    const mensajeCreado = { id: 1, ...data };

    baseServiceMock.createMessage.mockResolvedValue(mensajeCreado);
    usuariosMock.findByPk.mockResolvedValue({ id: 2, correo: 'dest@example.com' });

    const result = await service.createMessage(data);

    expect(baseServiceMock.createMessage).toHaveBeenCalledWith(data);
    expect(usuariosMock.findByPk).toHaveBeenCalledWith(2);
    expect(emailSenderMock.send).toHaveBeenCalledWith('dest@example.com', 'Tienes un nuevo mensaje: "Hola"');
    expect(result).toEqual(mensajeCreado);
  });

  test('Unhappy Path: destinatario sin correo → no se envía', async () => {
    const data = {
      contenido: 'Mensaje sin correo',
      remitenteId: 1,
      destinatarioId: 3,
      publicacionId: 8,
      estado: 'pendiente'
    };

    const mensajeCreado = { id: 2, ...data };

    baseServiceMock.createMessage.mockResolvedValue(mensajeCreado);
    usuariosMock.findByPk.mockResolvedValue({ id: 3 }); // Sin correo

    const result = await service.createMessage(data);

    expect(emailSenderMock.send).not.toHaveBeenCalled();
    expect(result).toEqual(mensajeCreado);
  });

  test('Unhappy Path: error al enviar correo → no rompe el flujo', async () => {
    const data = {
      contenido: 'Falla SMTP',
      remitenteId: 1,
      destinatarioId: 4,
      publicacionId: 9,
      estado: 'pendiente'
    };

    const mensajeCreado = { id: 3, ...data };

    baseServiceMock.createMessage.mockResolvedValue(mensajeCreado);
    usuariosMock.findByPk.mockResolvedValue({ id: 4, correo: 'fail@example.com' });
    emailSenderMock.send.mockRejectedValue(new Error('SMTP error'));

    const result = await service.createMessage(data);

    expect(result).toEqual(mensajeCreado);
    expect(emailSenderMock.send).toHaveBeenCalled();
  });
});

