// Archivo: servidor/tests/chatbotService.test.js

const ChatbotService = require('../services/chatbotService');
const fetch = require('node-fetch');

jest.mock('node-fetch');

describe('ChatbotService.queryAI', () => {

  // Guardamos y restauramos las variables de entorno para no afectar otras pruebas
  const originalEnv = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    fetch.mockClear();
  });

  afterAll(() => {
    process.env = originalEnv; // Restaura al final de todas las pruebas
  });


  // ===================================================
  // CASO 1: HAPPY PATH (El camino feliz)
  // Probamos que todo funciona como se espera en el caso ideal.
  // ===================================================
  test('Happy Path: debe llamar a la API de la IA y devolver una respuesta exitosa', async () => {
    // 1. Preparación (Arrange)
    process.env.YOUR_SECURE_API_KEY = 'clave-secreta-de-prueba';
    const service = new ChatbotService();

    const payloadMock = { contents: [{ role: 'user', parts: [{ text: 'hola' }] }], system_instruction: {} };
    const aiResponseMock = { candidates: [{ content: { parts: [{ text: 'Respuesta simulada' }] } }] };

    // Simulamos una respuesta exitosa de la API de Google
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(aiResponseMock),
    });

    // 2. Actuación (Act)
    const resultado = await service.queryAI(payloadMock);

    // 3. Aserción (Assert)
    expect(fetch).toHaveBeenCalledTimes(1); // Verificamos que se llamó a la API externa
    expect(resultado).toEqual(aiResponseMock); // Verificamos que el resultado es el esperado
  });


  // ===================================================
  // CASO 2: UNHAPPY PATH (Fallo en la API externa)
  // Probamos cómo reacciona nuestro código cuando la API de Google falla.
  // ===================================================
  test('Unhappy Path: debe lanzar un error si la API de la IA falla', async () => {
    // 1. Preparación
    process.env.YOUR_SECURE_API_KEY = 'clave-secreta-de-prueba';
    const service = new ChatbotService();
    const payloadMock = { contents: [], system_instruction: {} };

    // Simulamos una respuesta de error de la API de Google
    fetch.mockResolvedValue({
      ok: false,
      text: () => Promise.resolve('Internal Server Error'),
    });

    // 2. Actuación y 3. Aserción
    // Esperamos que nuestra función falle (rejects) con el mensaje de error correcto
    await expect(service.queryAI(payloadMock)).rejects.toThrow('Error al comunicarse con la IA.');
  });


  // ===================================================
  // CASO 3: UNHAPPY PATH
  // Probamos qué pasa si olvidamos configurar nuestra propia API Key.
  // ===================================================
  test('Unhappy Path: debe lanzar un error si la API Key no está configurada', async () => {
    // 1. Preparación
    delete process.env.YOUR_SECURE_API_KEY; // Forzamos que la clave no exista
    const service = new ChatbotService();
    const payloadMock = { contents: [], system_instruction: {} };

    // 2. Actuación y 3. Aserción
    await expect(service.queryAI(payloadMock)).rejects.toThrow('Error de configuración del servidor.');
    
    // Verificamos que, si no hay clave, NUNCA se intenta llamar a la API externa
    expect(fetch).not.toHaveBeenCalled();
  });
});