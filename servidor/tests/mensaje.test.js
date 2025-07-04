// tests/Mesnsaje.test.js 
const MessageService = require('../services/MessageService');

// Mock del modelo mensajes
jest.mock('../models', () => ({
  mensajes: {
    create: jest.fn()
  }
}));

const { mensajes } = require('../models');

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

  test('Unhappy Path: error al crear mensaje', async () => {
    const dataMock = {
      contenido: 'Error esperado',
      remitenteId: 1,
      destinatarioId: 2,
      publicacionId: 99,
      estado: 'pendiente'
    };

    mensajes.create.mockRejectedValue(new Error('Fallo al guardar'));

    const service = new MessageService();

    await expect(service.createMessage(dataMock)).rejects.toThrow('Fallo al guardar');
    expect(mensajes.create).toHaveBeenCalledWith(dataMock);
  });
});
