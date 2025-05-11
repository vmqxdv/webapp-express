const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'express-blog'
});

connection.connect((err) => {
    if (err) throw err;

    console.log('Db Connessio');
});

module.exports = connection;