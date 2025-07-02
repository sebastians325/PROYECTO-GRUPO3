// tests/Mensaje.test.js

const request = require('supertest');
const app = require('../index');
const db = require('../models');

describe('POST /directo - Comunicación directa entre usuarios', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Crear usuarios
    await db.usuarios.bulkCreate([
      {
        id: 1,
        nombre: "Alice",
        apellido: "Tester",
        correo: "alice@example.com",
        password: "123456",
        role: "freelancer"
      },
      {
        id: 2,
        nombre: "Bob",
        apellido: "Cliente",
        correo: "bob@example.com",
        password: "123456",
        role: "cliente"
      }
    ]);

    // Crear publicación
    await db.publicaciones.create({
      id: 1,
      titulo: "Proyecto test",
      descripcion: "Test descripción",
      pago: 200,
      usuarioId: 2
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('Happy Path: mensaje directo exitoso', async () => {
    const res = await request(app)
      .post('/directo')
      .send({
        contenido: "Hola, estoy interesado en tu publicación.",
        remitenteId: 1,
        destinatarioId: 2,
        publicacionId: 1
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensaje', 'Mensaje enviado y email notificado.');
    expect(res.body.data).toHaveProperty('contenido', "Hola, estoy interesado en tu publicación.");
  });

  test('Unhappy Path: remitente y destinatario iguales', async () => {
    const res = await request(app)
      .post('/directo')
      .send({
        contenido: "Mensaje a mí mismo",
        remitenteId: 1,
        destinatarioId: 1,
        publicacionId: 1
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'No puedes enviarte mensajes a ti mismo.');
  });

  test('Unhappy Path: destinatario no existente', async () => {
    const res = await request(app)
      .post('/directo')
      .send({
        contenido: "Mensaje a usuario inexistente",
        remitenteId: 1,
        destinatarioId: 999,
        publicacionId: 1
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Remitente o destinatario no válido.');
  });

  test('Unhappy Path: falta el contenido', async () => {
    const res = await request(app)
      .post('/directo')
      .send({
        remitenteId: 1,
        destinatarioId: 2,
        publicacionId: 1
      });

    // Puede devolver 500 si el servicio requiere contenido obligatoriamente
    expect([400, 500]).toContain(res.statusCode);
  });
});
