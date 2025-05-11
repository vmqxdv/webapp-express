const express = require('express');
const app = express();
const PORT = 1229;
const router = require('./routes/posts');

app.use(express.static('public'));

app.use('/posts', router);

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});