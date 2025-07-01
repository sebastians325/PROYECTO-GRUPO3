const { publicaciones, postulaciones, usuarios, Review } = require('../models');
const { obtenerHistorialFreelancer } = require('./freelancer.repository');

jest.mock('../models', () => ({
  publicaciones: {
    findAll: jest.fn()
  },
  postulaciones: {},
  usuarios: {},
  Review: {}
}));

describe("Freelancer Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("obtenerHistorialFreelancer", () => {
    const freelancerId = 2;

    //  HAPPY PATH
    test("should return historial of closed publications with accepted postulaciones and review", async () => {
      // PREPARAR
      const mockHistorial = [
        {
          id: 1,
          titulo: "Proyecto prueba",
          estado: "cerrado",
          postulaciones: [{ id: 10, usuarioId: 2, estado: "aceptado" }],
          Reviews: [{ id: 5, comentario: "Buen trabajo", calificacion: 4 }],
          cliente: { nombre: "Ana", apellido: "Ramírez" }
        }
      ];

      publicaciones.findAll.mockResolvedValue(mockHistorial);

      // EJECUTAR
      const result = await obtenerHistorialFreelancer(freelancerId);

      // VALIDAR
      expect(publicaciones.findAll).toHaveBeenCalledWith({
        where: { estado: 'cerrado' },
        include: [
          {
            model: postulaciones,
            where: { usuarioId: freelancerId, estado: 'aceptado' },
            required: true
          },
          {
            model: Review,
            required: false
          },
          {
            model: usuarios,
            as: 'cliente',
            attributes: ['nombre', 'apellido']
          }
        ],
        order: [['updatedAt', 'DESC']]
      });

      expect(result).toEqual(mockHistorial);
    });

    //  UNHAPPY PATH
    test("should throw error if database fails", async () => {
      publicaciones.findAll.mockRejectedValue(new Error("DB error"));

      await expect(obtenerHistorialFreelancer(freelancerId))
        .rejects
        .toThrow("DB error");
    });
  });
});
