const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',                       //Apply your own SQL username and password here
  password: 'root',                   //Apply your own SQL username and password here
  database: 'hermes_database'
});
module.exports = connection;