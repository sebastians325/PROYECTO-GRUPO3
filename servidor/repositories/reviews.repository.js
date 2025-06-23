const { Review, usuarios } = require('../models');

class ReviewRepository {
    async findAll() {
        try {
            console.log('Repository: Finding all reviews');
            return await Review.findAll({
                include: [{
                    model: usuarios,
                    as: 'cliente',
                    attributes: ['nombre', 'apellido']
                }],
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            console.error('Repository error:', error);
            throw new Error(`Database error: ${error.message}`);
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

// Export the class instead of an instance
module.exports = ReviewRepository;