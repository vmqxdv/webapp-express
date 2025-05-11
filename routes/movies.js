const express = require('express');
const router = express.Router();
const { getAllMovies: index, getMovieById: show } = require('../controllers/moviesController');

router.get('/', index);
router.get('/:id', show);

module.exports = router;
