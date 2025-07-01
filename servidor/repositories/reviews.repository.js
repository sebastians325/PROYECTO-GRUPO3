const { Review, usuarios } = require('../models');

class ReviewRepository {
    async findAll() {
        try {
            return await Review.findAll({
                include: [{
                    model: usuarios,
                    as: 'cliente',
                    attributes: ['nombre', 'apellido']
                }],
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            throw new Error(`Database connection failed: ${error.message}`);
        }
    }

    async create(reviewData) {
        try {
            // Validar valoración
            if (reviewData.valoracion < 0 || reviewData.valoracion > 5) {
                throw new Error('La valoración debe estar entre 0 y 5');
            }

            // Check if review already exists
            const existingReview = await Review.findOne({
                where: {
                    publicacionId: reviewData.publicacionId,
                    usuarioId: reviewData.usuarioId
                }
            });

            if (existingReview) {
                throw new Error('Ya existe una reseña para esta publicación');
            }

            return await Review.create(reviewData);
        } catch (error) {
            throw new Error(`Error creating review in repository: ${error.message}`);
        }
    }
}

// Export the class instead of an instance
module.exports = ReviewRepository;