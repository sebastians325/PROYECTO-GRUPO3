const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews.controller');

router.post('/', reviewController.createReview.bind(reviewController));

router.get('/', reviewController.getAllReviews.bind(reviewController));

module.exports = router;