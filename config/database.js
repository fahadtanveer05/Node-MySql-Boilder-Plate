const mysql = require('mysql2/promise');

var db = mysql.createPool({
    connectionLimit: 100,
    waitForConnections: true,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Test',
    timezone: 'utc',
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock', // for MAMP
});

module.exports = db;