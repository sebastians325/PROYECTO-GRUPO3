const ReviewRepository = require('../repositories/reviews.repository');

class ReviewService {
    constructor() {
        // Instantiate the repository
        this.reviewRepository = new ReviewRepository();
    }

    async getAllReviews() {
        try {
            return await this.reviewRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener las reseñas: ${error.message}`);
        }
    }

    async createReview(reviewData) {
        try {
            const { publicacionId, comentario, calificacion, usuarioId } = reviewData;
            
            if (!comentario || !calificacion || !publicacionId || !usuarioId) {
                throw new Error('Faltan datos requeridos');
            }

            return await this.reviewRepository.create(reviewData);
        } catch (error) {
            throw new Error(`Error al crear la reseña: ${error.message}`);
        }
    }
}

// Export a new instance of the service
module.exports = new ReviewService();