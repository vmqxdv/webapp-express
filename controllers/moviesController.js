const db = require('../database/mysql');

function getAllMovies(req, res) {
  const sql = `
    SELECT 
      movies.*, 
      ROUND(AVG(reviews.vote), 1) AS average_vote 
    FROM 
      movies
    JOIN 
      reviews ON movies.id = reviews.movie_id 
    GROUP BY 
      movies.id
  `

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore nel recupero dei film' });

    const result = results.map(movie => {
      return {
        ...movie,
        imagePath: movie.image ? `${process.env.IMAGE_PATH}/movies/${movie.image}` : null,
      };
    });

    res.json(result);
  });
};

function getMovieById(req, res) {
  const movieId = Number(req.params.id);

  const sql = `
    SELECT 
      movies.*, 
      ROUND(AVG(reviews.vote), 1) AS average_vote 
    FROM 
      movies
    JOIN 
      reviews ON movies.id = reviews.movie_id 
    WHERE 
      movies.id = ?
    GROUP BY 
      movies.id
  `;

  db.query(sql, [movieId], (err, results) => {
    if (err)
      return res.status(500).json({ error: 'Errore nel recupero del film' });

    if (results.length === 0)
      return res.status(404).json({ error: 'Film non trovato' });

    const movie = results.find(m => m.id === movieId);

    db.query('SELECT * FROM reviews WHERE movie_id = ?', [movieId], (err, reviews) => {
      if (err) return res.status(500).json({ error: 'Errore nel recupero delle recensioni' });

      res.json({
        ...movie,
        imagePath: movie.image ? `${process.env.IMAGE_PATH}/movies/${movie.image}` : null,
        reviews
      });
    });
  });
};

function addReview(req, res) {
  const movieId = Number(req.params.id);
  const { name, text, vote } = req.body;

  if (!name || !text || typeof vote !== 'number')
    return res.status(400).json({ error: 'Dati recensione mancanti o non validi' });

  const sql = `
    INSERT INTO
      reviews (movie_id, name, text, vote)
    VALUES 
      (?, ?, ?, ?)
  `;

  db.query(sql, [movieId, name, text, vote], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Errore nel salvataggio della recensione' });
    };

    res.status(201).json({ message: 'Recensione aggiunta con successo', reviewId: result.insertId });
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  addReview,
};