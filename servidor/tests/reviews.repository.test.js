const { Review, usuarios } = require('../models');
const ReviewRepository = require('../repositories/reviews.repository');

// Update mock to include findOne
jest.mock('../models', () => ({
    Review: {
        findAll: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn()
    },
    usuarios: {}
}));

describe("Review Repository", () => {
    let reviewRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        reviewRepository = new ReviewRepository();
        // Mock findOne to return null by default (no existing review)
        Review.findOne.mockResolvedValue(null);
    });

    describe("Find All Reviews", () => {
        //HAPPY PATH    
        test("should return all reviews with client information", async () => {
            // PREPARAR
            const mockReviews = [
                { 
                  id: 1, 
                  comentario: 'Excelente trabajo', 
                  valoracion: 5,
                  cliente: {
                    nombre: 'Juan',
                    apellido: 'Pérez'
                  }
                }
              ];
            Review.findAll.mockResolvedValue(mockReviews);

            // EJECUTAR
            const result = await reviewRepository.findAll();

            // VALIDAR
            expect(Review.findAll).toHaveBeenCalledWith({
              include: [{
                model: usuarios,
                as: 'cliente',
                attributes: ['nombre', 'apellido']
              }],
              order: [['createdAt', 'DESC']]
            });
            expect(result).toEqual(mockReviews);
        });

        //UNHAPPY PATH
        test("should handle database errors when finding reviews", async () => {
            // PREPARAR
            Review.findAll.mockRejectedValue(new Error('Connection failed'));

            // EJECUTAR & VALIDAR
            await expect(reviewRepository.findAll())
                .rejects
                .toThrow('Database connection failed: Connection failed');
        });
    });


    //HAPPY PATH
    describe("Create Review", () => {
        test("should create a new review successfully", async () => {
            // PREPARAR
            const newReview = { 
                publicacionId: 1,
                usuarioId: 1,
                comentario: 'Buen trabajo', 
                valoracion: 4 
            };
            const createdReview = { id: 1, ...newReview };
            Review.findOne.mockResolvedValue(null); // No existing review
            Review.create.mockResolvedValue(createdReview);

            // EJECUTAR
            const result = await reviewRepository.create(newReview);

            // VALIDAR
            expect(Review.findOne).toHaveBeenCalledWith({
                where: {
                    publicacionId: newReview.publicacionId,
                    usuarioId: newReview.usuarioId
                }
            });
            expect(Review.create).toHaveBeenCalledWith(newReview);
            expect(result).toEqual(createdReview);
        });

        //UNHAPPY PATH
        test("should handle database errors when creating a review", async () => {
            // PREPARAR
            const invalidReview = {};
            const dbError = new Error('Invalid review data');
            Review.create.mockRejectedValue(dbError);

            // EJECUTAR y VALIDAR
            await expect(async () => {
                await reviewRepository.create(invalidReview);
            }).rejects.toThrow('Error creating review in repository: Invalid review data');
        });

        test("should throw error when review already exists for publication", async () => {
            // PREPARAR
            const existingReview = {
                publicacionId: 1,
                usuarioId: 1,
                comentario: 'Review previo',
                valoracion: 5
            };
            
            const newReview = {
                publicacionId: 1,
                usuarioId: 1,
                comentario: 'Nuevo review',
                valoracion: 4
            };

            // Mock findOne to simulate existing review
            Review.findOne = jest.fn().mockResolvedValue(existingReview);

            // EJECUTAR y VALIDAR
            await expect(async () => {
                await reviewRepository.create(newReview);
            }).rejects.toThrow('Ya existe una reseña para esta publicación');
            
            expect(Review.findOne).toHaveBeenCalledWith({
                where: {
                    publicacionId: newReview.publicacionId,
                    usuarioId: newReview.usuarioId
                }
            });
        });

        test("should throw error when rating is greater than 5", async () => {
            // PREPARAR
            const invalidReview = {
                publicacionId: 1,
                usuarioId: 1,
                comentario: 'Gran trabajo',
                valoracion: 6  // Valoración inválida
            };

            // EJECUTAR y VALIDAR
            await expect(async () => {
                await reviewRepository.create(invalidReview);
            }).rejects.toThrow('La valoración debe estar entre 0 y 5');
            
            // Verificar que no se llamó a create
            expect(Review.create).not.toHaveBeenCalled();
        });
    });
});