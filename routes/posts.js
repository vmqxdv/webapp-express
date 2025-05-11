const express = require('express');
const router = express.Router();
const db = require('../database/mysql');

router.get('/', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) 
      return res.status(500).json({ error: err.message });

    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const postId = req.params.id;

  const sql = `
    SELECT 
      *
    FROM 
      posts
    JOIN 
      post_tag ON posts.id = post_tag.post_id
    JOIN
      tags ON post_tag.tag_id = tags.id
    WHERE
      posts.id = ?
  `;

  db.query(sql, [postId], (err, results) => {
      if (err) 
        return res.status(500).json({ error: err.message });
      
      if (results.length === 0) 
        return res.status(404).json({ error: 'Post non trovato' });
      
      const post = results[0];
      post.tags = post.tags ? post.tags.split(',') : [];
      res.json(post);
    }
  );
});

router.delete('/:id', (req, res) => {
  const postId = req.params.id;
  db.query('DELETE FROM posts WHERE id = ?', [postId], (err, result) => {
    if (err) 
      return res.status(500).json({ error: err.message });
    
    if (result.affectedRows === 0) 
      return res.status(404).json({ error: 'Post non trovato' });
    
    res.status(204).send();
  });
});

module.exports = router;