const mysql = require('mysql');

let mysql_json_file = require('../private/database.json');
mysql_json_file = JSON.parse(JSON.stringify(mysql_json_file));

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: mysql_json_file.id,
  password: mysql_json_file.password,
  database: 'todoApp_db'
});

module.exports = connection;