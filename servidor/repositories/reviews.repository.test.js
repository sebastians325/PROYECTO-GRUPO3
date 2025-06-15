const { Review, usuarios } = require('../models');
const ReviewRepository = require('./reviews.repository');

jest.mock('../models', () => ({
    Review: {
        findAll: jest.fn(),
        create: jest.fn()
    },
    usuarios: {}
}));

describe("Review Repository", () => {
    let reviewRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        reviewRepository = new ReviewRepository();
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
            const newReview = { comentario: 'Buen trabajo', valoracion: 4 };
            const createdReview = { id: 1, ...newReview };
            Review.create.mockResolvedValue(createdReview);

            // EJECUTAR
            const result = await reviewRepository.create(newReview);

            // VALIDAR
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
    });
});