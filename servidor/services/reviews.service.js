const ReviewRepository = require('../repositories/reviews.repository');

class ReviewService {
    constructor() {
        // Create instance of ReviewRepository
        this.reviewRepository = new ReviewRepository();
    }

    async getAllReviews() {
        try {
            const reviews = await this.reviewRepository.findAll();
            return reviews;
        } catch (error) {
            throw new Error(`Error al obtener las reseñas: ${error.message}`);
        }
    }

    async createReview(reviewData) {
        try {
            const { publicacionId, comentario, calificacion, usuarioId } = reviewData;
            if (!comentario || !calificacion || !publicacionId || !usuarioId) {
                throw new Error('Missing required fields');
            }
            return await this.reviewRepository.create(reviewData);
        } catch (error) {
            throw new Error(`Error creating review: ${error.message}`);
        }
    }
}

// Export a new instance of the service
module.exports = new ReviewService();