const ReviewRepository = require('../repositories/reviews.repository');
const reviewRepository = new ReviewRepository();
class ReviewService {
    async createReview(reviewData) {
        try {
            const { publicacionId, comentario, calificacion, usuarioId } = reviewData;
            
            if (!comentario || !calificacion || !publicacionId || !usuarioId) {
                throw new Error('Todos los campos son requeridos');
            }

            if (calificacion < 1 || calificacion > 5) {
                throw new Error('La calificación debe estar entre 1 y 5');
            }

            return await reviewRepository.create({
                comentario,
                calificacion,
                publicacionId,
                usuarioId
            });
        } catch (error) {
            throw new Error('Error in review service: ' + error.message);
        }
    }

    async getAllReviews() {
        try {
            const reviews = await reviewRepository.findAll();
            
            if (!reviews) {
                throw new Error('No se encontraron reseñas');
            }

            return reviews;
        } catch (error) {
            throw new Error('Error al obtener las reseñas: ' + error.message);
        }
    }
}

module.exports = new ReviewService();