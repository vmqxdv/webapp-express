require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.SITE_PORT || 3000;
const router = require('./routes/movies');

app.use(express.static('public'));

app.use('/movies', router);

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});