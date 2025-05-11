require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes/posts');

app.use(express.static('public'));

app.use('/posts', router);

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});