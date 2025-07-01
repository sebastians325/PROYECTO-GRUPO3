const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviews.controller');

// Create instance of controller
const reviewController = new ReviewController();

// Define routes
router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);

module.exports = router;