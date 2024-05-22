const mysql = require('mysql');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'bfs6q4ldshqguxgwtnmj-mysql.services.clever-cloud.com',
  user: 'uglkzhrissceuzk4',
  password: 'j2XjJo2i7icepkRxtkFJ',
  database: 'bfs6q4ldshqguxgwtnmj'
});

module.exports = pool;
