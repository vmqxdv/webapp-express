const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'webapp-express'
});

connection.connect((err) => {
    if (err) throw err;

    console.log('Db Connesso');
});

module.exports = connection;