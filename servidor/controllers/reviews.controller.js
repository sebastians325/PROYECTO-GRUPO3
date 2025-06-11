const reviewService = require('../services/reviews.service');

class ReviewController {
    async createReview(req, res) {
        try {
            const reviewData = {
                publicacionId: req.body.publicacionId,
                comentario: req.body.comentario,
                calificacion: req.body.calificacion,
                usuarioId: req.body.usuarioId
            };

            const newReview = await reviewService.createReview(reviewData);
            res.status(201).json(newReview);
        } catch (error) {
            console.error('Error in review controller:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllReviews(req, res) {
        try {
            const reviews = await reviewService.getAllReviews();
            res.json(reviews);
        } catch (error) {
            console.error('Error getting reviews:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ReviewController();