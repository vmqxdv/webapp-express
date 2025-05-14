require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.SITE_PORT || 3000;
const router = require('./routes/movies');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');


app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.use(express.static('public'));

app.use('/movies', router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});