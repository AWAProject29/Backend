const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql');
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,                  //Apply your own SQL username and password here
  password: process.env.DB_PASS,                   //Apply your own SQL username and password here
  database: 'heroku_c9cfd14f42ab636'
});
module.exports = connection;