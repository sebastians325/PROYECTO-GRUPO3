const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const ReviewController = require('../controllers/reviews.controller');

// Create instance of controller
const reviewController = new ReviewController();

// Define routes
router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
=======
const reviewController = require('../controllers/reviews.controller');

router.post('/', reviewController.createReview.bind(reviewController));

router.get('/', reviewController.getAllReviews.bind(reviewController));
>>>>>>> EddyHistorialReseñas

module.exports = router;