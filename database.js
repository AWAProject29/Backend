const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'Daniel1',                       //Apply your own SQL username and password here
  password: 'MyUzero1Acc',                   //Apply your own SQL username and password here
  database: 'hermes_database'
});
module.exports = connection;