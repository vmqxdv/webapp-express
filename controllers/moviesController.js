const db = require('../database/mysql');

function getAllMovies(req, res) {
  const sql = `
    SELECT 
      movies.*, 
      ROUND(AVG(reviews.vote)) AS average_vote 
    FROM 
      movies
    JOIN 
      reviews ON movies.id = reviews.movie_id 
    GROUP BY 
      movies.id
  `

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore nel recupero dei film' });

    res.json(results);
  });
};

function getMovieById(req, res) {
  const movieId = Number(req.params.id);

  db.query('SELECT * FROM movies WHERE id = ?', [movieId], (err, results) => {
    if (err)
      return res.status(500).json({ error: 'Errore nel recupero del film' });

    if (results.length === 0)
      return res.status(404).json({ error: 'Film non trovato' });

    const movie = results.find(m => m.id === movieId);

    db.query('SELECT * FROM reviews WHERE movie_id = ?', [movieId], (err, reviews) => {
      if (err) return res.status(500).json({ error: 'Errore nel recupero delle recensioni' });

      res.json({ ...movie, reviews });
    });
  });
};


module.exports = {
  getAllMovies,
  getMovieById,
};