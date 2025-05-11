const express = require('express');
const router = express.Router();
const db = require('../database/mysql');

router.get('/', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err)
      return res.status(500).json({ error: 'Errore nel recupero dei film' });

    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const movieId = Number(req.params.id);

  db.query('SELECT * FROM movies WHERE id = ?', [movieId], (err, results) => {
    if (err)
      return res.status(500).json({ error: 'Errore nel recupero del film' });

    if (results.length === 0)
      return res.status(404).json({ error: 'Film non trovato' });

    const movie = results.find(m => m.id === movieId);

    db.query('SELECT * FROM reviews WHERE movie_id = ?', [movieId], (err, reviews) => {
      if (err)
        return res.status(500).json({ error: 'Errore nel recupero delle recensioni' });

      res.json({ ...movie, reviews });
    });
  });
});

module.exports = router;
