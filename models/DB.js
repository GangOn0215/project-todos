const mysql = require('mysql');
const sql   = require('./account/sql');

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
    if(error) {
      console.log(error);
      reject({ error });
    }

    resolve(results);
  }));
}

// module.exports = connection;
module.exports = query;