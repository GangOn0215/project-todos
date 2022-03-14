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

const query = async (alias, values, days, periodicity) => {
  let querySTR = sql[alias];

  // 만약 days에 데이터가 있다면 
  if(days !== undefined) {
    // days firstDay, lastDay 데이터를 삽입 시킨다.
    sql.setTimeSQL(values, days, periodicity);

    querySTR = sql.getBetweenTodosSTR();
    console.log(querySTR);
  }

  return new Promise((resolve, reject) => connection.query(querySTR, values, (error, results) => {
    if(error) {
      reject({ error });
    }
    
    resolve(results);
  })).catch((err) => {
    console.log(err);
  });
}

module.exports = query;