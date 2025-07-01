class ReviewController {
    constructor() {
        this.reviewService = require('../services/reviews.service');
        // Bind methods to this instance
        this.createReview = this.createReview.bind(this);
        this.getAllReviews = this.getAllReviews.bind(this);
    }

    async getAllReviews(req, res) {
        try {
            const reviews = await this.reviewService.getAllReviews();
            res.json(reviews);
        } catch (error) {
            console.error('Error getting reviews:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async createReview(req, res) {
        try {
            console.log('Review data received:', req.body);

            const reviewData = {
                publicacionId: req.body.publicacionId,
                comentario: req.body.comentario,
                calificacion: req.body.calificacion,
                usuarioId: req.body.usuarioId
            };

            const newReview = await this.reviewService.createReview(reviewData);
            res.status(201).json(newReview);
        } catch (error) {
            console.error('Error creating review:', error);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ReviewController;
