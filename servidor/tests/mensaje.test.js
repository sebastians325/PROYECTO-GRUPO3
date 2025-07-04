const MessageService = require('../services/MessageService');

jest.mock('../models', () => ({
  mensajes: {
    create: jest.fn()
  },
  usuarios: {
    findByPk: jest.fn()
  }
}));

const { mensajes, usuarios } = require('../models');

describe('MessageService.createMessage', () => {
  test('Happy Path: debe crear un mensaje con datos válidos', async () => {
    const dataMock = {
      contenido: 'Hola mundo',
      remitenteId: 1,
      destinatarioId: 2,
      publicacionId: 10,
      estado: 'pendiente'
    };

    const mensajeEsperado = { id: 1, ...dataMock };
    mensajes.create.mockResolvedValue(mensajeEsperado);

    const service = new MessageService();
    const resultado = await service.createMessage(dataMock);

    expect(mensajes.create).toHaveBeenCalledWith(dataMock);
    expect(resultado).toEqual(mensajeEsperado);
  });

  test('Unhappy Path: remitente y destinatario son iguales', async () => {
    const dataMock = {
      contenido: 'No válido',
      remitenteId: 1,
      destinatarioId: 1,
      publicacionId: 20,
      estado: 'pendiente'
    };

    const service = new MessageService();

    await expect(service.createMessage(dataMock)).rejects.toThrow('No puedes enviarte mensajes a ti mismo.');
  });

  test('Unhappy Path: destinatario no existe', async () => {
    const dataMock = {
      contenido: 'Prueba de error',
      remitenteId: 1,
      destinatarioId: 999,
      publicacionId: 30,
      estado: 'pendiente'
    };

    usuarios.findByPk.mockImplementation((id) => {
      if (id === 1) return Promise.resolve({ id: 1 });
      if (id === 999) return Promise.resolve(null);
    });

    const service = new MessageService();

    await expect(service.createMessage(dataMock)).rejects.toThrow('Remitente o destinatario no válido.');
  });

  test('Unhappy Path: falta el contenido', async () => {
    const dataMock = {
      contenido: undefined,
      remitenteId: 1,
      destinatarioId: 2,
      publicacionId: 99,
      estado: 'pendiente'
    };

    mensajes.create.mockImplementation(() => {
      throw new Error('El contenido es requerido');
    });

    const service = new MessageService();

    await expect(service.createMessage(dataMock)).rejects.toThrow('El contenido es requerido');
  });
});
