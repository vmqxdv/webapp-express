const express = require('express');
const router = express.Router();
const { getAllMovies: index, getMovieById: show, addReview: post } = require('../controllers/moviesController');

router.get('/', index);
router.get('/:id', show);
router.post('/:id/reviews', post);

module.exports = router;
