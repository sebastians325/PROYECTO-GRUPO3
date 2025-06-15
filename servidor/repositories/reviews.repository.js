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
            return await Review.create(reviewData);
        } catch (error) {
            throw new Error('Error creating review in repository: ' + error.message);
        }
    }
}

module.exports = ReviewRepository;