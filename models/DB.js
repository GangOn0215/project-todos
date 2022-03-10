const mysql = require('mysql');
const sql   = require('./sql');

const connection = mysql.createPool({
  // set dotenv
  connectionLimit: process.env.MYSQL_LIMIT,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

const query = async (alias, values) => {
  return new Promise((resolve, reject) => connection.query(sql[alias], values, (error, results) => {
    console.log('break');
    if(error) {
      reject({ error });
    }
    
    resolve(results);
  })).catch((err) => {
    console.log(err);
  });
}

module.exports = query;