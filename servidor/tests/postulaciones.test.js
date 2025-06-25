const request = require('supertest');
const app = require('../index');
const db = require('../models');

describe('POST /postulaciones/postular-con-cv', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true }); // recrea todo
    await db.usuarios.create({
      id: 1,
      nombre: "Test",
      apellido: "User",
      correo: "test@example.com",
      password: "hashedpass",
      role: "freelancer"
    });
    await db.publicaciones.create({
      id: 1,
      titulo: "Test Tarea",
      descripcion: "Test Descripción",
      pago: 100,
      usuarioId: 1
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('✅ Happy Path: postulación con CV exitosa', async () => {
    const res = await request(app)
      .post('/postulaciones/postular-con-cv')
      .send({
        usuarioId: 1,
        publicacionId: 1,
        cvUrl: "https://mock-s3/cv_123456_mocked.pdf"
      });

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('cvUrl');
  });

  test('❌ Unhappy Path: sin usuarioId', async () => {
    const res = await request(app)
      .post('/postulaciones/postular-con-cv')
      .send({
        publicacionId: 1,
        cvUrl: "https://mock-s3/cv_123456_mocked.pdf"
      });

    expect([400, 500]).toContain(res.statusCode);
  });
});